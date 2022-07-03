import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GrStackOverflow } from 'react-icons/gr'
import { BsTextParagraph } from 'react-icons/bs'
import NumberFormat from 'react-number-format'
import axios from '../../../../network/axios'
import Cookies from 'universal-cookie'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function RoomPickerItem ({ roomId, nameRoom, capacity, oldPrice, newPrice, description, checkinDate, hotelInfo }) {
  const cookies = new Cookies()
  const user = cookies.get('userInfo')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
  const [outOfRoom, setOutOfRoom] = useState(false)
  const [outOfRoomSpan, setOutOfRoomSpan] = useState('Hết phòng')
  const [allowBooking, setAllowBooking] = useState(false)
  const [allowSpan, setAllowSpan] = useState('')
  const [roomInfo, setRoomInfo] = useState({
    roomId: '',
    nameRoom: '',
    capacity: '',
    oldPrice: ''
  })
  const [calendarText, setCalendarText] = useState('')
  const router = useRouter()

  const goToLogin = () => {
    setOpen(false)
    router.push('/login')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const goToCheckout = async () => {
    window.sessionStorage.setItem('roomInfo', JSON.stringify(roomInfo))
    window.sessionStorage.setItem('hotelInfo', JSON.stringify(hotelInfo))
    window.sessionStorage.setItem('calendarText', calendarText)
    if (user) {
      return router.push('/checkout')
    }
    return setOpen(true)
  }
  const checkBlank = async () => {
    axios({
      method: 'POST',
      url: '/api/bookings/check',
      data: ({ roomId, checkinDate: calendarText })
    }).then(async (response) => {
      setAllowSpan(response?.data?.msg)
      return setAllowBooking(true)
    }).catch(err => {
      setOutOfRoom(true)
      return setOutOfRoomSpan(err?.response?.data?.msg)
    })
  }
  useEffect(() => {
    setRoomInfo({
      roomId: roomId,
      nameRoom: nameRoom,
      capacity: capacity,
      oldPrice: oldPrice
    })
    setCalendarText(checkinDate.toLocaleDateString('vi-VI'))
    setOutOfRoom(false)
    setAllowBooking(false)
  }, [checkinDate])
  return (
    <div className='room-picker-item d-grid gap-3'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Bạn chưa đăng nhập?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Hãy đăng nhập để có thể chúng tôi có thể lưu lại lịch sử đặt phòng của bạn, từ đó cải thiện trang sao cho phù hợp với bạn hơn.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <button
            onClick={goToLogin}
            className='us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-3 py-1'
          >
            Đăng nhập
          </button>
        </DialogActions>
      </Dialog>
      <div className='room-picker-item__top d-flex justify-content-between'>
        <div className='d-flex flex-column text-start'>
          <h3 className='font-semibold text-lg'>{nameRoom}</h3>
        </div>
        <span className='d-flex flex-column gap-2 text-end'>
          <span className='text-lg font-semibold text-orange-500'>
            <NumberFormat
              thousandsGroupStyle='thousand'
              value={newPrice}
              decimalSeparator='.'
              displayType='text'
              thousandSeparator
              allowNegative
              suffix=' VND'
            />
          </span>
          <span className='text-sm text-decoration-line-through text-neutral-500'>
            <NumberFormat
              thousandsGroupStyle='thousand'
              value={oldPrice}
              decimalSeparator='.'
              displayType='text'
              thousandSeparator
              allowNegative
              suffix=' VND'
            />
          </span>
        </span>
      </div>
      <div className='room-picker-item__border' />
      <div className='room-picker-item__bottom'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column gap-2'>
            <div className={`room-desc ${active ? 'active' : ''} position-relative d-grid gap-2`}>
              <span className='align-items-center'>
                <BsTextParagraph />
                <span className='ms-2'>Mô tả</span>
              </span>
              <div className='room-details__desc text-neutral-6000'>
                <p>
                  {description}
                </p>
                <span className='align-items-center'>
                  <GrStackOverflow />
                  <span className='ms-2'>Các tiện ích</span>
                </span>
              </div>
            </div>
            <a onClick={(() => setActive(!active))} className={`pt-2 p-1 btn-desc-readmore font-semibold ${active ? 'active' : ''}`} />
          </div>
        </div>
      </div>
      {allowBooking && <span className='d-flex justify-content-end text-green-800'>{allowSpan}</span>}
      <div className='d-flex justify-content-end'>
        {
          !outOfRoom &&
            <button
              onClick={(() => { allowBooking ? goToCheckout() : checkBlank() })}
              className='us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-3 py-2'
            >
              {allowBooking ? 'Đặt phòng' : 'Kiểm tra'}
            </button>
        }
        {
          outOfRoom &&
            <span className='out-of-room'>
              {outOfRoomSpan}
            </span>
        }
      </div>
    </div>
  )
}
