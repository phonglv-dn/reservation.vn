import React from 'react'

export default function BookingFilter ({ filter, setFilter }) {
  return (
    <span className='booking-filter position-absolute'>
      Tìm: {' '}
      <input
        className='booking-filter__input'
        value={filter || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}
