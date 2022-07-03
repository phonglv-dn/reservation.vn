import React from 'react'
import { HiStar } from 'react-icons/hi'
import { FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

export default function StayCard (props) {
  return (
    <>
      <div className='us-stay-card position-relative bg-white border overflow-hidden'>
        <Link href={`/hotels/detail/${props._id}`}>
          <span>
            <div className='us-stay-card__wrap position-relative w-100'>
              <div className='us-gallery-slider'>
                <div className='us-hotel-image overflow-hidden'>
                  <img src={props.hotelPicsUrl} alt={props.name} />
                </div>
              </div>
              <div
                className='us-sale-off-badge d-flex align-items-center justify-content-center text-xs py-1 px-3 bg-red-700 text-red-50 rounded-pill position-absolute'
              >
                Khuyến mãi
              </div>
              <div className='px-3 pt-2 pb-3'>
                <div className='mt-1'>
                  <div className='d-flex align-items-center'>
                    <h2 className='us-hotel-title capitalize'>
                      <span className='us-hotel-title__span'>{props.name} </span>
                    </h2>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-2'>
                    <span className='us-hotel-desc'>{props.description}</span>
                  </div>
                  <div className='us-start-rating d-flex align-items-center mt-1 text-sm'>
                    <HiStar />
                    <span className='ms-1'>4.8 (28)</span>
                  </div>
                  <div className='d-flex align-items-center text-neutral-500 text-sm truncate'>
                    <FiMapPin className='me-1' />
                    <span className='hotel-addr-card'>{props.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </Link>
      </div>
    </>
  )
}
