import React from 'react'
import { FiShare2, FiHeart, FiMapPin } from 'react-icons/fi'
import { HiStar } from 'react-icons/hi'

export default function HotelDetailsMainSection (props) {
  return (
    <div className='hotel-info container'>
      <div className='d-flex justify-content-between align-items-center'>
        <span className='us-feature-tag d-inline-flex px-2 font-medium text-xs text-blue-800 bg-blue-100  position-relative'>{props.typeStay}</span>
        <div className='d-flex text-neutral-700 text-sm share-this-hotel'>
          <span className='share-this-hotel__item py-2 px-3 d-flex'>
            <FiShare2 />
            <span className='d-none d-sm-block ms-2 align-items-center'>Chia sẻ</span>
          </span>
          <span className='share-this-hotel__item py-2 px-3 d-flex'>
            <FiHeart />
            <span className='d-none d-sm-block ms-2 align-items-center'>Lưu</span>
          </span>
        </div>
      </div>
      <h2 className='hotel-details-align hotel-info__name font-semibold'>{props.name}</h2>
      <div className='hotel-details-align d-flex align-items-center'>
        <div className='us-start-rating d-flex align-items-center mt-1 text-sm'>
          <HiStar />
          <span className='ms-1'>4.8 (28)</span>
        </div>
        <span className='ms-4'>
          <FiMapPin />
          <span className='ms-2'>{props.address}</span>
        </span>
      </div>
    </div>
  )
}
