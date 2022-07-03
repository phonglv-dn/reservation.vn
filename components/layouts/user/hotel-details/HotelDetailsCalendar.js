import React, { useState } from 'react'
import Calendar from 'react-calendar'

export default function HotelDetailsCalendar ({ parentCallback }) {
  const toDay = new Date()
  toDay.setHours(0, 0, 0, 0)

  // State for date selected by user
  const [selectedDate, setSelectedDate] = useState(toDay)

  // State for text above calander
  const [calendarText, setCalendarText] = useState(toDay.toLocaleDateString('vi-VI'))
  const [confirmDate, setConfirmDate] = useState(true)
  const handleDateChange = (value) => {
    setSelectedDate(value)
    setCalendarText(value.toLocaleDateString('vi-VI'))
  }
  const handleConfirm = () => {
    parentCallback(selectedDate)
    setConfirmDate(true)
  }
  const reSelect = () => {
    setConfirmDate(false)
  }
  return (
    <div className='listing-section__wrap position-relative mt-4'>
      <div>
        <h2 className='hotel-info__title font-semibold'>Ngày đã chọn: {calendarText}</h2>
        <span className='d-block mt-2 text-neutral-500'>Vui lòng chọn ngày bạn muốn đặt để kiểm tra</span>
      </div>
      <div className='hotels-details-calendar__controller'>
        <Calendar
          className={`w-100 mt-4 ${confirmDate ? 'd-none' : ''}`}
          minDate={toDay}
          locale='vi-VI'
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <div className='d-flex justify-content-end pt-4'>
        <button
          onClick={(() => { confirmDate ? reSelect() : handleConfirm() })}
          className='us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'
        >
          {confirmDate ? 'Chọn lại' : 'Cập nhật'}
        </button>
      </div>
    </div>
  )
}
