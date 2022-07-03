import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function PopupDetails ({ popupTitle, children, setOpen }) {
  return (
    <div className='pdc-content d-inline-flex flex-column overflow-hidden bg-white text-start align-middle'>
      <div className='pdc-content__top position-relative flex-shrink-0 px-4 border-bottom text-center py-3'>
        <h3 className='text-2xl font-semibold leading-6 text-gray-900'>{popupTitle}</h3>
        <button onClick={(() => setOpen(false))} className='pd-btn-close position-absolute text-neutral-700 d-flex justify-content-center align-items-center'>
          <IoClose />
        </button>
      </div>
      <div className='p-4 overflow-auto text-neutral-700'>
        {children}
      </div>
    </div>
  )
}
