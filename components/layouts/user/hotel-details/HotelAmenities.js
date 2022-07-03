import React from 'react'
import { BsWifi, BsTv } from 'react-icons/bs'
import { MdAir, MdBalcony } from 'react-icons/md'
import { GiWashingMachine, GiBathtub } from 'react-icons/gi'

export default function HotelAmenities (props) {
  return (
    <div className='listing-section__wrap position-relative mt-4'>
      <div>
        <h2 className='hotel-info__title font-semibold'>Tiện nghi</h2>
        <span className='d-block mt-2 text-neutral-500'>Giới thiệu về những tiện nghi và dịch vụ của nơi ở</span>
      </div>
      <div className='row row-cols-3 text-sm text-neutral-700 mt-3'>
        <div className='col mb-3 d-flex align-items-center'>
          <BsWifi />
          <span className='ms-2'>Wifi</span>
        </div>
        <div className='col mb-3 d-flex align-items-center'>
          <BsTv />
          <span className='ms-2'>TV</span>
        </div>
        <div className='col mb-3 d-flex align-items-center'>
          <MdAir />
          <span className='ms-2'>Điều hòa</span>
        </div>
        <div className='col d-flex align-items-center'>
          <GiWashingMachine />
          <span className='ms-2'>Máy giặt</span>
        </div>
        <div className='col mb-3 d-flex align-items-center'>
          <GiBathtub />
          <span className='ms-2'>Bồn tắm</span>
        </div>
        <div className='col mb-3 d-flex align-items-center'>
          <MdBalcony />
          <span className='ms-2'>Ban công</span>
        </div>
      </div>
      <div className='pt-4'>
        <button className='us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'>Hiển thị thêm</button>
      </div>
    </div>
  )
}
