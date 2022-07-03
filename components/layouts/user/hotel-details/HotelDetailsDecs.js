import React, { useState } from 'react'

export default function HotelDetailsMainSection (props) {
  const [active, setActive] = useState(false)
  return (
    <div className={`hotel-info hotel-details-desc listing-section__wrap position-relative ${active ? 'active' : ''}`}>
      <h2 className='hotel-info__title font-semibold'>Thông tin khách sạn</h2>
      <p className='hotel-details-align hotel-details__desc text-neutral-6000'>
        {props.description}
      </p>
      <a onClick={(() => setActive(!active))} className={`pt-2 p-1 btn-desc-readmore font-semibold ${active ? 'active' : ''}`} />
    </div>
  )
}
