import React, { useState } from 'react'
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineSearch, HiOutlineHome } from 'react-icons/hi'
import DatePicker from 'react-datepicker'

export default function SectionHero ({ name, sub, btnStart, location, image, amount }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const toDay = new Date()

  return (
    <div className='us-section-hero container d-flex flex-column-reverse flex-lg-collumn position-relative'>
      <div className='d-flex flex-collumn flex-lg-row align-items-lg-center'>
        <div className='us-section-hero__left flex-shrink-0 d-flex flex-column align-items-start'>
          <h2 className='font-medium'>{name}</h2>
          <div className='mt-5'>
            <span className='text-base text-neutral-500'>
              {sub}
            </span>
            {
              amount &&
                <span className='d-flex align-items-center text-sm text-neutral-500'>
                  <HiOutlineHome />
                  <span className='ms-3 mt-0'>{amount} khách sạn & chỗ ở khác</span>
                </span>
            }
          </div>
          <button className={`us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3 ${btnStart}`}>
            Bắt đầu tìm kiếm
          </button>
        </div>
        <div className='us-section-hero__right flex-grow-1'>
          <div className='hotel-image-wrap position-relative overflow-hidden'>
            <div className='hotel-image' style={{ backgroundImage: `url(${image})` }}>
              <img className='w-100' src='/images/background/banner.png' alt='banner' />
            </div>
          </div>
        </div>
      </div>
      <div className='search-area w-100 position-absolute'>
        <div className='us-hero-search w-100'>
          <form className='us-hero-search-form w-100 position-relative d-flex flex-column flex-md-row shadow-xl bg-white'>
            <div className='position-relative d-flex us-location-search'>
              <div className='d-flex flex-1 position-relative flex-shrink-0 align-items-center text-start us-location-search__wrap'>
                <div className='location-icon text-neutral-300'>
                  <HiOutlineLocationMarker />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <input className='d-block w-100 p-0 bg-transparent font-semibold' id='location' placeholder={location} />
                  <span className='d-block mt-1 text-sm text-neutral-400 font-light'>
                    <label htmlFor='location' className='item-search-lb line-clamp-1'>Bạn muốn đi đâu?</label>
                  </span>
                </div>
              </div>
            </div>
            <div className='stay-dates-range-input position-relative flex-shrink-0 d-flex'>
              <div className='checkin-date d-flex flex-column flex-lg-row align-items-lg-center w-100 flex-shrink-0 position-relative border-neutral-200'>
                <div className='checkin-date__wrap position-relative d-flex flex-shrink-0 align-items-center'>
                  <div className='location-icon text-neutral-300'>
                    <HiOutlineCalendar />
                  </div>
                  <div className='datepicker-toggle flex-grow-1 ms-3'>
                    <DatePicker
                      id='checkin'
                      autoComplete='off'
                      className='position-absolute d-block w-100 p-0 bg-transparent font-semibold'
                      selected={selectedDate}
                      locale='vi-VI'
                      onChange={date => setSelectedDate(date)}
                      dateFormat='dd/MM/yyyy'
                      placeholderText='Chọn ngày'
                      minDate={toDay}
                      isClearable
                    />
                    <span className='d-block mt-1 text-sm text-neutral-400 font-light'>
                      <label htmlFor='checkin' className='item-search-lb line-clamp-1'>Bạn muốn đi đâu?</label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='us-hero-search-btn px-2 py-2 py-lg-0 d-flex align-items-center justify-content-center'>
              <a className='w-100 bg-primary-6000 d-flex align-items-center justify-content-center text-neutral-50 text-center'>
                <span className='me-3 d-md-none'>Tìm kiếm</span>
                <HiOutlineSearch />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
