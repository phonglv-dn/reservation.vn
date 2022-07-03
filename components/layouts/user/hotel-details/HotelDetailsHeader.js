import React, { useState } from 'react'
import { HiOutlineViewGrid } from 'react-icons/hi'
import PopupImage from '../popup/PopupImage'
import PopupLayout from '../popup/PopupLayout'

export default function HotelDetailsHeader ({ hotelPicsUrl }) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <header className='us-hotel-details-images container mt-5'>
      <div className='row position-relative'>
        <div className='hotel-image-wrap col-12 col-md-6 position-relative overflow-hidden'>
          <div className='hotel-image' style={{ backgroundImage: `url(${hotelPicsUrl[0]})` }}>
            <img className='w-100' src='https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg' />
          </div>
        </div>
        <div className='hotel-image-wrap col-4 col-md-6 position-relative overflow-hidden'>
          <div className='row mb-3'>
            <div className='hotel-image-wrap col-12 col-md-6 position-relative overflow-hidden'>
              <div className='hotel-image' style={{ backgroundImage: `url(${hotelPicsUrl[1]})` }}>
                <img className='w-100' src='https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg' />
              </div>
            </div>
            <div className='hotel-image-wrap col-12 col-md-6 position-relative overflow-hidden'>
              <div className='hotel-image' style={{ backgroundImage: `url(${hotelPicsUrl[2]})` }}>
                <img className='w-100' src='https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='hotel-image-wrap col-12 col-md-6 position-relative overflow-hidden'>
              <div className='hotel-image' style={{ backgroundImage: `url(${hotelPicsUrl[3]})` }}>
                <img className='w-100' src='https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg' />
              </div>
            </div>
            <div className='hotel-image-wrap col-12 col-md-6 position-relative overflow-hidden'>
              <div className='hotel-image' style={{ backgroundImage: `url(${hotelPicsUrl[4]})` }}>
                <img className='w-100' src='https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg' />
              </div>
            </div>
          </div>
        </div>
        <div className='position-absolute btn-show-all-wrap'>
          <button onClick={(() => setOpenModal(true))} className='d-flex align-items-center text-base text-neutral-500 position-absolute btn-show-all'>
            <HiOutlineViewGrid className='me-2' />
            <span>Hiển thị tất cả ảnh</span>
          </button>
        </div>
        {
          openModal &&
            <PopupLayout>
              <PopupImage hotelPicsUrl={hotelPicsUrl} setOpen={setOpenModal} />
            </PopupLayout>
        }
      </div>
    </header>
  )
}
