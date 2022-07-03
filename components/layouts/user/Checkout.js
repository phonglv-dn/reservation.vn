import React, { useEffect, useState } from 'react'
import axios from '../../../network/axios'
import Cookies from 'universal-cookie'
import InputForm from '../../../components/layouts/user/InputForm'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { SyncLoader } from 'react-spinners'
import { css } from '@emotion/react'

const override = css`
  display: block;
  margin: 0 auto;
`

const schema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Độ dài tên quá ngắn.!')
    .max(30, 'Độ dài tên quá dài.!')
    .required('Không được để trống'),
  email: Yup.string()
    .lowercase()
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Vui lòng nhập một địa chỉ email hợp lệ')
    .email(''),
  repeatEmail: Yup.string()
    .oneOf([Yup.ref('email'), null], 'Email nhập lại chưa trùng')
    .required('Không được để trống'),
  phone: Yup.string()
    .min(10, 'Vui lòng nhập đủ 10 số')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Số điện thoại không hợp lệ')
})

export default function Checkout () {
  const cookies = new Cookies()
  const user = cookies.get('userInfo')
  const toDay = new Date()
  toDay.setHours(0, 0, 0, 0)
  const router = useRouter()

  const [bookingInfo, setBookingInfo] = useState({
    userId: '',
    cityId: '',
    hotelId: '',
    roomId: '',
    checkinDate: toDay.toLocaleDateString('vi-VI'),
    userName: '',
    email: '',
    phone: '',
    totalPrice: 0
  })
  const [roomInfo, setRoomInfo] = useState('')
  const [hotelInfo, setHotelInfo] = useState('')
  const [calendarText, setCalendarText] = useState(toDay.toLocaleDateString('vi-VI'))
  const [selected, setSelected] = useState(false)
  const [submiting, setSubmitting] = useState(false)
  const handleSubmit = async (values) => {
    setSubmitting(true)
    setBookingInfo(values)
    axios({
      method: 'POST',
      url: '/api/bookings',
      data: values
    }).then(async (response) => {
      toast.success(response?.data?.msg)
      const bookingId = response?.data?.booking?._id
      window.sessionStorage.setItem('inprocess', 'yes')
      return router.push(`/paydone/${bookingId}`)
    }).catch(err => {
      setSubmitting(false)
      toast.error(err?.response?.data?.msg)
    })
  }

  useEffect(() => {
    if (user) {
      const calendar = window.sessionStorage.getItem('calendarText')
      const room = JSON.parse(window.sessionStorage.getItem('roomInfo'))
      if (!room) {
        return router.push('/')
      } else {
        setSelected(true)
        const hotel = JSON.parse(window.sessionStorage.getItem('hotelInfo'))

        setBookingInfo({
          ...bookingInfo,
          checkinDate: calendar,
          cityId: hotel.cityID,
          hotelId: hotel._id,
          roomId: room.roomId,
          userId: user._id,
          totalPrice: room.oldPrice + ((room.oldPrice) * 10) / 100
        })

        setCalendarText(calendar)
        setRoomInfo(room)
        setHotelInfo(hotel)
      }
    }
  }, [router])
  if (selected) {
    return (
      <div>
        <div className='nc-CheckOutPage '>
          <div className='container mt-5 mb-5'>
            <div className='row'>
              <div className='col-md-7'>
                <div className='confirm-checkout__box w-100'>
                  <h2>Xác nhận và thanh toán</h2>
                  <div className='border-checkout' />
                  <div className='checkout-yourtrip__box'>
                    <h3>Thông tin chi tiết</h3>
                    <Formik
                      initialValues={bookingInfo}
                      validationSchema={schema}
                      enableReinitialize
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className='d-grid gap-2 py-3'>
                          <div className='checkout-yourtrip__border'>
                            <div className='checkout-form-yourtrip w-100'>
                              <span className='text-sm text-neutral-400 light-letters'>Ngày:</span>
                              <span className='mt-1.5 text-lg font-semibold checkout-form-yourtrip__bot-title'>{calendarText}</span>
                            </div>
                          </div>
                          <Field
                            id='userName'
                            name='userName'
                            titleLabel='Tên thật'
                            type='text'
                            component={InputForm}
                            errors={errors.userName}
                            touched={touched.userName}
                            placeholder='Nhập đúng tên trong căn cước của bạn'
                          />
                          <Field
                            id='email'
                            name='email'
                            titleLabel='Email'
                            type='email'
                            component={InputForm}
                            errors={errors.email}
                            touched={touched.email}
                            placeholder='Nhập email của bạn'
                          />
                          <Field
                            id='repeatEmail'
                            name='repeatEmail'
                            titleLabel='Xác nhận email'
                            type='email'
                            errors={errors.repeatEmail}
                            component={InputForm}
                            touched={touched.repeatEmail}
                            placeholder='Nhập lại email của bạn'
                          />
                          <Field
                            id='phone'
                            name='phone'
                            titleLabel='Số điện thoại (Không bắt buộc)'
                            type='text'
                            errors={errors.email}
                            component={InputForm}
                            touched={touched.email}
                            placeholder='Nhập số điện thoại của bạn'
                          />
                          <div className='pt-4'>
                            <button
                              type='submit'
                              className='us-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5'
                              disabled={submiting}
                            >
                              {
                                submiting ? <SyncLoader color='#FFF' loading={submiting} speedMultiplier={0.5} css={override} size={10} /> : 'Hoàn tất'
                              }
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className='d-flex w-100 total flex-column'>
                  <div className='total__top '>
                    <div className='total__info-hotel--img'>
                      <img
                        src={
                          hotelInfo.hotelPicsUrl ? hotelInfo.hotelPicsUrl : 'https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg'
                        }
                      />
                    </div>
                    <div className='total__info-hotel'>
                      <div>
                        <span className='light-letters total__info-hotel--title'>{hotelInfo.name}</span>
                        <span className='total__info-hotel--cate'>{roomInfo.nameRoom}</span>
                      </div>
                      <span className='light-letters total__info-hotel--title'>Phù hợp: {roomInfo.capacity} người</span>
                      <div className='border-total w-10' />
                      <div className='total__star'>
                        <span className='font-medium'>Tiêu chuẩn: {hotelInfo.ratingStar} sao</span>
                      </div>
                    </div>
                  </div>
                  <div className='total__bot'>
                    <h3>Chi tiết</h3>
                    <div className='d-flex justify-content-between mt-3'>
                      <span>Giá phòng</span>
                      <span>
                        <NumberFormat
                          thousandsGroupStyle='thousand'
                          value={roomInfo.oldPrice}
                          decimalSeparator='.'
                          displayType='text'
                          thousandSeparator
                          allowNegative
                          suffix=' VND'
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                      <span>Thuế và phí dịch vụ</span>
                      <span>10%</span>
                    </div>
                    <div className='border-total-bot' />
                    <div className='d-flex justify-content-between fw-semibold'>
                      <span>Tổng</span>
                      <span>
                        <NumberFormat
                          thousandsGroupStyle='thousand'
                          value={bookingInfo.totalPrice}
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
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
