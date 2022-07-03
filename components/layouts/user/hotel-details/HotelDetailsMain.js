import React, { useEffect, useState } from 'react'
import axios from '../../../../network/axios'
import isEmpty from 'lodash/isEmpty'
import HotelAmenities from './HotelAmenities'
import HotelDetailsCalendar from './HotelDetailsCalendar'
import HotelDetailsDecs from './HotelDetailsDecs'
import HotelDetailsMaps from './HotelDetailsMaps'
import HotelRoomsPicker from './HotelRoomsPicker'

export default function HotelDetailsMain ({ description, address, hotelInfo }) {
  const [listRooms, setListRooms] = useState(null)
  const toDay = new Date()
  toDay.setHours(0, 0, 0, 0)
  const [checkinDate, setCheckinDate] = useState(toDay)
  const callback = (value) => {
    setCheckinDate(value)
  }
  const getListRoom = async () => {
    const list = await axios.post('/api/hotels/rooms/list', { hotelID: hotelInfo._id })
    setListRooms(list?.data?.rooms)
  }
  useEffect(() => {
    if (!isEmpty(hotelInfo)) {
      getListRoom()
    }
  }, [hotelInfo])
  return (
    <main className='hotel-details-main__container container position-relative mt-5'>
      <div className='row'>
        <div className='col-12'>
          <HotelDetailsDecs description={description} />
          <HotelAmenities />
          <HotelDetailsCalendar parentCallback={callback} />
          <HotelRoomsPicker
            listRooms={listRooms}
            checkinDate={checkinDate}
            hotelInfo={hotelInfo}
          />
          <HotelDetailsMaps address={address} />
        </div>
      </div>
    </main>
  )
}
