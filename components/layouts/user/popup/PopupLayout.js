import React from 'react'

export default function PopupLayout ({ children }) {
  return (
    <>
      <div className='pd-wrap position-fixed top-0 bottom-0 start-0 end-0'>
        <div className='pd-align px-3 text-center'>
          <div className='pd-bgr position-fixed top-0 bottom-0 start-0 end-0' />
          <div className='d-inline-block zero-width-space align-middle' />
          <div className='pdc d-inline-block py-5'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
