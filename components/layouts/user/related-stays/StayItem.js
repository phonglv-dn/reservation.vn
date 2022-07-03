import React from 'react'

export default function StayItem ({ image, name, location }) {
  return (
    <div className='related-hotels__slider'>
      <div>
        <div className='related-hotels__slider--img'>
          <img src={image} alt={name} />
        </div>
        <div className='related-hotels__slider--title'>
          <h2>{name}</h2>
          <p>{location}</p>
        </div>
      </div>
    </div>
  )
}
