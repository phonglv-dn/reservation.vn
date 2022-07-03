import React from 'react'
import NumberFormat from 'react-number-format'
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineHashtag
} from 'react-icons/hi'
import { AiOutlineSchedule } from 'react-icons/ai'
import { FaRegCalendarPlus } from 'react-icons/fa'
import Link from 'next/link'

export default function PopupDetailsBooking ({ bookingInfo }) {
  return (
    <div className='d-grid gap-4'>
      <div className='d-grid gap-3 border-bottom pb-4'>
        <h4 className='font-semibold w-100'>
          Thông tin khách
        </h4>
        <div className='d-flex justify-content-between'>
          <div className='d-flex justify-content-between'>
            <HiOutlineUser className='me-2' />
            <span>{bookingInfo?.userName}</span>
          </div>
          <div className='d-flex'>
            <HiOutlineMail className='me-2' />
            <span>{bookingInfo?.email}</span>
          </div>
          {
            bookingInfo?.phone &&
              <div className='d-flex'>
                <HiOutlinePhone className='me-2' />
                <span>{bookingInfo.phone}</span>
              </div>
          }
        </div>
      </div>
      <div className='d-grid gap-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex' data-bs-toggle='tooltip' data-bs-placement='top' title='Mã hóa đơn'>
            <HiOutlineHashtag className='me-2' />
            <span>{bookingInfo?._id}</span>
          </div>
          <div className='d-flex' data-bs-toggle='tooltip' data-bs-placement='top' title='Ngày tạo đơn'>
            <FaRegCalendarPlus className='me-2' />
            <span>{(new Date(bookingInfo?.createdAt).toLocaleDateString('vi-VI'))}</span>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='booking-info__left d-grid gap-3'>
            <h3 className='font-semibold' data-bs-toggle='tooltip' data-bs-placement='top' title='Tên phòng'>{bookingInfo.room[0].name}</h3>
            <div className='d-flex align-items-center' data-bs-toggle='tooltip' data-bs-placement='top' title='Tên chỗ ở'>
              <HiOutlineOfficeBuilding className='fs-4 me-2' />
              <span>{bookingInfo?.hotel[0]?.name}</span>
            </div>
            <div className='d-flex align-items-center' data-bs-toggle='tooltip' data-bs-placement='top' title='Địa chỉ'>
              <HiOutlineLocationMarker className='fs-4 me-2' />
              <span>{bookingInfo?.hotel[0]?.address}</span>
            </div>
            <div className='d-flex align-items-center' data-bs-toggle='tooltip' data-bs-placement='top' title='Ngày nhận phòng'>
              <AiOutlineSchedule className='fs-4 me-2' />
              <span>{bookingInfo?.checkinDate}</span>
            </div>
          </div>
          <div className='d-grid gap-2 align-items-center text-end text-lg'>
            <span className={bookingInfo.checking ? 'text-gray-400' : 'text-red-400'}>{bookingInfo?.checking ? 'Đã nhận phòng' : 'Chưa nhận phòng'}</span>
            <NumberFormat
              className='font-semibold text-lg'
              thousandsGroupStyle='thousand'
              value={bookingInfo?.totalPrice}
              decimalSeparator='.'
              displayType='text'
              thousandSeparator
              allowNegative
              suffix=' VND'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Tổng hóa đơn'
            />
            <Link href={`/hotels/detail/${bookingInfo?.hotel[0]?._id}`}>
              <button className='us-button position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3'>
                Đặt lại
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
