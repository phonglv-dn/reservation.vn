import React from 'react'
import { HiStar } from 'react-icons/hi'
import NumberFormat from 'react-number-format'

export default function HotelDetailsSideBar () {
  return (
    <div className='position-sticky hotels-details-sidebar'>
      <div className='listing-section-sidebar__wrap'>
        <div className='d-flex justify-content-between'>
          <span className='hd-bill-price font-semibold'>
            25 Tháng 8
          </span>
          <div className='us-start-rating d-flex align-items-center mt-1 text-sm'>
            <HiStar />
            <span className='ms-1'>4.8 (28)</span>
          </div>
        </div>
        <div className='d-flex flex-column border border-neutral-200 mt-3'>
          <div className='stay-date'>
            <div className='position-relative d-flex p-3 flex-shrink-0 justify-content-between align-items-center'>
              <div>
                <span className='d-block font-semibold'>Phòng đơn phổ thông</span>
                <span className='d-block mt-1 text-sm text-neutral-400 leading-none font-light'>
                  <NumberFormat
                    thousandsGroupStyle='thousand'
                    value={700000}
                    decimalSeparator='.'
                    displayType='text'
                    thousandSeparator
                    allowNegative
                    suffix=' VND'
                  />
                </span>
              </div>
              <div>x 3</div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column mt-3'>
          <div className='d-flex justify-content-between font-semibold mt-2'>
            <span>Tổng</span>
            <span>
              <NumberFormat
                thousandsGroupStyle='thousand'
                value={2100000}
                decimalSeparator='.'
                displayType='text'
                thousandSeparator
                allowNegative
                suffix=' VND'
              />
            </span>
          </div>
        </div>
        <div className='btn-show-more__wrap d-flex justify-content-center pt-4'>
          <button className='us-button btn-show-more position-relative w-100 d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'>Thanh toán</button>
        </div>
      </div>
    </div>
  )
}
