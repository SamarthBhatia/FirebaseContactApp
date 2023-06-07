import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import {collection, getDocs, onSnapshot} from 'firebase/firestore'
import { db } from './config/Firebase'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {IoMdTrash} from 'react-icons/io'
import {RiEditCircleLine} from 'react-icons/ri'
import ContactCard from './components/ContactCard'
import Modal from './components/Modal'
import AddandUpdateContact from './components/AddandUpdateContact'
import useDisclose from './hooks/useDisclose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [contacts,setContacts]=useState([])
  const {isOpen,onClose,onOpen}=useDisclose()


  useEffect(() => {
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db,"Contacts")


        onSnapshot(contactsRef,(snapshot => {
          const contactLists=snapshot.docs.map((doc) => {
            return{
              id: doc.id,
              ...doc.data()
            }
          })
          setContacts(contactLists)
          return contactLists
        }))
        
      } catch (error) {
        console.log(error)
      }
    }

    getContacts()
  } , [])


  const filterContacts = (e) =>{
    const value=e.target.value
    const contactsRef=collection(db,"Contacts")
    
    onSnapshot(contactsRef,(snapshot => {
      const contactLists=snapshot.docs.map((doc) => {
        return{
          id: doc.id,
          ...doc.data()
        }
      })

      const filteredContact=contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContact)
      return filteredContact
    }))
}


  return (
    <>
      <div className="max-w-[370px] mx-auto">
        <Navbar/>
        <div className=" flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className=" ml-1 absolute text-white text-3xl" />
            <input onChange={filterContacts} type="text" className="flex-grow bg-transparent border-white border rounded-md h-10 text-white pl-9" />
          </div>
          <AiFillPlusCircle onClick={onOpen} className=" text-5xl text-white cursor-pointer"/>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {
            contacts.map((contact) => <ContactCard key={contact.id} contact={contact}/>)
          }
        </div>
      </div>
      <AddandUpdateContact onClose={onClose} isOpen={isOpen}/>
      <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App