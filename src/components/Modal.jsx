import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
      {isOpen && 
        <>
          <div className=" m-auto min-h-[200px] max-w-[80%] z-50 relative bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className=" text-2xl self-end"/>
            </div>
            {children}
          </div>
          <div onClick={onClose} className=" top-0 absolute backdrop-blur z-40 h-screen w-screen"/>
        </>
      }
    </>
  ,document.getElementById('modal-root'))
}

export default Modal