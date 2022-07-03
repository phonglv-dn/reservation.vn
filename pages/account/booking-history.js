import { useEffect, useState } from 'react'
import axios from '../../network/axios'
import Me from '.'
import Layout from '../../components/layouts/user/Layout'
import BookingTable from '../../components/layouts/user/me/booking-history/BookingTable'
import PopupDetails from '../../components/layouts/user/popup/PopupDetails'
import PopupLayout from '../../components/layouts/user/popup/PopupLayout'
import PopupDetailsBooking from '../../components/layouts/user/popup/PopupDetailsBooking'
import { toast } from 'react-toastify'

export default function BookingHistory (user) {
  const [bookings, setBookings] = useState([])
  const [bookingInfo, setBookingInfo] = useState(null)
  const [open, setOpen] = useState(false)
  const getBookings = async (userId) => {
    await axios({
      url: `/api/bookings/all-of/${userId}`
    }).then(async (response) => {
      if (response?.status === 404) {
        return toast.error('Không tìm thấy người dùng')
      } else {
        const bookings = await response?.data?.booking
        return setBookings(bookings)
      }
    }).catch((e) => {
      return toast.error('Lỗi hệ thống !!')
    })
  }

  const getBookingInfo = async (bookingId) => {
    const info = await axios({
      url: `/api/bookings/${bookingId}`
    })
    setBookingInfo(info?.data?.booking[0])
    setOpen(true)
  }

  useEffect(() => {
    getBookings(user?.user)
  }, [])

  return (
    <>
      <h2 className='me-tab__title'>Lịch sử đặt phòng</h2>
      {
        bookings.length > 0 &&
          <div id='table-wrapper'>
            <div id='table-scroll'>
              <BookingTable data={bookings} getBookingInfo={getBookingInfo} />
            </div>
          </div>
      }
      {
        bookings.length === 0 &&
          <span className='mt-3'>Bạn chưa có đơn đặt phòng nào</span>
      }
      {
        open &&
          <div className='booking-details-popup'>
            <PopupLayout>
              <PopupDetails popupTitle='Thông tin đơn hàng' setOpen={setOpen}>
                <PopupDetailsBooking bookingInfo={bookingInfo} />
              </PopupDetails>
            </PopupLayout>
          </div>
      }
    </>
  )
}
BookingHistory.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Me>
        {page}
      </Me>
    </Layout>
  )
}
