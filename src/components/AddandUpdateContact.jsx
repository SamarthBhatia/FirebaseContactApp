import React from 'react'
import Modal from './Modal'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { toast } from 'react-toastify'
import * as Yup from 'yup'


const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Email is wrong").required("Email is Required")
})


const AddandUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

    const addContact = async (contact,id) =>{
        try {
            const contactRef=collection(db,"Contacts")
            await addDoc(contactRef,contact)
            toast.success("Contact Added Successfully")
            onClose()
        } catch (error) {
            console.log(error)
        }
    } 

    const updateContact = async (contact) =>{
        try {
            const contactRef=doc(db,"Contacts",id)
            await updateDoc(contactRef,contact)
            toast.success("Contact Updated Successfully")
            onClose()
        } catch (error) {
            console.log(error)
        }
    } 



  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <Formik validationSchema={contactSchemaValidation} initialValues={isUpdate ? {
            name:contact.name,
            email:contact.email
        }:{
            name:"",
            email:""
        }}
        onSubmit={(values) => {console.log(values)
            isUpdate ? updateContact(values,contact.id) :
        addContact(values)}}
        >
                <Form className="flex flex-col gap-2">
                    <div className='flex flex-col'>
                        <label htmlFor='name'>Name</label>
                        <Field name="name" className="h-10 border"/>
                        <div className=" text-xs  text-red-500">
                            <ErrorMessage name='name'/>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email'>Email</label>
                        <Field name="email" className="h-10 border"/>
                        <div className="text-xs  text-red-500">
                            <ErrorMessage name='email'/>
                        </div>
                    </div>
                    <button className="bg-orange px-3 py-1 border self-end">{isUpdate ? "Update" : "Add"} Contact</button>
                </Form>
            </Formik>
        </Modal>
    </div>
  )
}

export default AddandUpdateContact