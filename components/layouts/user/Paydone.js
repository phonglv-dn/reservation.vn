import { AiFillStar } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NumberFormat from 'react-number-format'
import axios from '../../../network/axios'
import Link from 'next/link'
import Cookies from 'universal-cookie'

export default function Paydone (context) {
  const router = useRouter()
  const cookies = new Cookies()
  const user = cookies.get('userInfo')
  const [selected, setSelected] = useState(false)

  const [bookingInfo, setBookingInfo] = useState({
    id: '',
    checkinDate: '',
    hotelPicsUrl: '',
    createdAt: '',
    totalPrice: 0,
    hotelName: '',
    roomName: '',
    roomCapacity: 0
  })

  const dateString = new Date(bookingInfo.createdAt).toLocaleDateString('vi-VI')
  const bookingId = router.query.bookingId
  const getRoom = async () => {
    await axios({
      url: `/api/bookings/${bookingId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      const booking = res?.data?.booking[0]
      if (booking) {
        setBookingInfo({
          ...bookingInfo,
          id: booking?._id,
          checkinDate: booking?.checkinDate,
          hotelPicsUrl: booking?.hotel?.[0]?.hotelPicsUrl,
          createdAt: booking?.createdAt,
          totalPrice: booking?.totalPrice,
          hotelName: booking?.hotel[0]?.name,
          roomName: booking?.room[0]?.name,
          roomCapacity: booking?.room[0]?.capacity
        })
      }
    }).catch((e) => {
      setSelected(false)
      return router.push('/')
    })
  }
  useEffect(() => {
    const inprocess = window.sessionStorage.getItem('inprocess')
    getRoom()
    if (!inprocess || !user) {
      return router.push('/')
    } else {
      setSelected(true)
    }
    window.sessionStorage.clear()
  }, [bookingId])
  if (selected) {
    return (
      <div>
        <div className='container mt-5 mb-5 d-flex justify-content-center'>
          <div className='nc-congratulation'>
            <div className='nc-congratulation__box'>
              <h2>Chúc mừng bạn 🎉</h2>
              <div className='nc-congratulation__border' />
              <div className='nc-congratulation__booking'>
                <h3>Đơn của bạn</h3>
                <div className='nc-congratulation__top'>
                  <div className='d-flex'>
                    <div>
                      <img src={bookingInfo?.hotelPicsUrl?.[0] || 'https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg'} />
                    </div>
                    <div className='nc-congratulation__tiltepay'>
                      <div>
                        <span className='light-letters nc-congratulation__info-hotel--title'>{bookingInfo?.hotelName || ''}</span>
                        <span className='nc-congratulation__info-hotel--cate'>{bookingInfo?.roomName || ''}</span>
                      </div>
                      <span className='light-letters nc-congratulation__info-hotel--title'>Phù hợp: {bookingInfo?.roomCapacity || ''} người</span>
                      <div className='border-nc-congratulation w-10' />
                      <div className='nc-congratulation__star'>
                        <i><AiFillStar /></i>
                        <span className='font-medium'>4.5</span>
                        <span className='light-letters'>(110)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='checkout-yourtrip__border congratulation__border'>
                  <div className='checkout-form-yourtrip w-100'>
                    <span className='text-sm text-neutral-400 light-letters'>Ngày:</span>
                    <span className='mt-1.5 text-lg font-semibold checkout-form-yourtrip__bot-title'>{bookingInfo?.checkinDate || ''}</span>
                  </div>
                </div>
              </div>
              <div className='nc-congratulation__detail'>
                <h3>Chi tiết đặt phòng</h3>
                <div className='d-flex flex-column'>
                  <div>
                    <div className='d-flex'>
                      <span className='flex-1 nc-congratulation__detail--item-top'>Mã đơn</span>
                      <span className='flex-1 nc-congratulation__detail--item-bot'>{bookingInfo?.id || ''}</span>
                    </div>
                  </div>
                  <div>
                    <div className='d-flex mt-3'>
                      <span className='flex-1 nc-congratulation__detail--item-top'>Ngày tạo đơn</span>
                      <span className='flex-1 nc-congratulation__detail--item-bot'>{dateString || ''}</span>
                    </div>
                  </div>
                  <div>
                    <div className='d-flex mt-3'>
                      <span className='flex-1 nc-congratulation__detail--item-top'>Tổng chi phí</span>
                      <span className='flex-1 nc-congratulation__detail--item-bot'>
                        <NumberFormat
                          thousandsGroupStyle='thousand'
                          value={bookingInfo?.totalPrice || ''}
                          decimalSeparator='.'
                          displayType='text'
                          thousandSeparator
                          allowNegative
                          suffix=' VND'
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href='/'>
                <div className='nc-congratulation__button'>
                  <button>Khám phá thêm</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
