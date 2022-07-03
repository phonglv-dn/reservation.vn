import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function HotelModels () {
  return (
    <div className='hotel-models bg-neutral-800 position-fixed top-0 bottom-0 start-0 end-0'>
      <a>
        <IoClose className='position-absolute top-0 start-0 m-4 p-2 close-models' />
      </a>
      <div className='container overflow-hidden'>
        <img className='hotels-models__img' src='https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' />
      </div>
    </div>
  )
}
