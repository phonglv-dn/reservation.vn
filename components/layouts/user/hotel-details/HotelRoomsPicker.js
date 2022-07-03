import React, { useState } from 'react'
import RoomPickerItem from './RoomPickerItem'

export default function HotelRoomsPicker ({ listRooms, checkinDate, hotelInfo }) {
  const [visible, setVisible] = useState(3)
  const [btnShowMore, setBtnShowMore] = useState(true)

  const showMoreItems = () => {
    if (visible >= listRooms.length) {
      setBtnShowMore(false)
    }
    return setVisible(prevValue => prevValue + 3)
  }
  const showLessItems = () => {
    setBtnShowMore(true)
    return setVisible(2)
  }
  return (
    <div className='listing-section__wrap position-relative mt-4'>
      <div>
        <h2 className='hotel-info__title font-semibold'>Chọn phòng</h2>
        <span className='d-block mt-2 text-neutral-500'>Vui lòng chọn phòng bạn muốn đặt để kiểm tra</span>
      </div>
      <div className='d-grid list-hotel-rooms gap-3 mt-3'>
        {
          listRooms?.slice(0, visible).map((room, index) => {
            return (
              <div key={index}>
                <RoomPickerItem
                  roomId={room._id}
                  nameRoom={room.name}
                  capacity={room.capacity}
                  oldPrice={room.price}
                  newPrice={room.price - ((room.price) * (room.sale) / 100)}
                  description={room.description}
                  checkinDate={checkinDate}
                  hotelInfo={hotelInfo}
                />
              </div>
            )
          })
          }
      </div>
      <div className='show-more-room text-center mt-4'>
        {
          btnShowMore && <button onClick={showMoreItems} className='us-button-secondary position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'>Hiển thị thêm</button>
        }
        {
        !btnShowMore && <button onClick={showLessItems} className='us-button-secondary position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'>Thu gọn</button>
        }
      </div>
    </div>
  )
}
