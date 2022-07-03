import React, { useEffect, useState } from 'react'
import axios from '../../../network/axios'
import Layout from '../../../components/layouts/user/Layout'
import HotelDetailsHeader from '../../../components/layouts/user/hotel-details/HotelDetailsHeader'
import HotelDetailsMainInfo from '../../../components/layouts/user/hotel-details/HotelDetailsMainInfo'
import HotelDetailsMain from '../../../components/layouts/user/hotel-details/HotelDetailsMain'
import isEmpty from 'lodash/isEmpty'
import Head from 'next/head'

// This gets called on every request
export async function getServerSideProps (context) {
  const { hotelId } = context.query
  let res = {}
  if (hotelId) {
    res = await axios({
      method: 'GET',
      url: `http://localhost:3001/api/hotels/${hotelId}`
    })
  }
  return { props: { info: res?.data?.hotel || {} } }
}
export default function HotelDetails (props) {
  const {
    info
  } = props

  const [hotelDetails, setHotelDetails] = useState({
    typeStay: '',
    hotelPicsUrl: 'https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg',
    name: '',
    address: '',
    description: '',
    ratingStar: 0
  })

  useEffect(() => {
    if (!isEmpty(info)) {
      setHotelDetails(info)
    }
  }, [info])
  return (
    <div className='us-detail-page mb-5'>
      <Head>
        <title>{info.name} || Reservation.vn</title>
      </Head>
      <HotelDetailsMainInfo
        typeStay={hotelDetails.typeStay}
        name={hotelDetails.name}
        address={hotelDetails.address}
      />
      <HotelDetailsHeader
        hotelPicsUrl={hotelDetails.hotelPicsUrl}
      />
      <HotelDetailsMain
        name={hotelDetails.name}
        address={hotelDetails.address}
        description={hotelDetails.description}
        hotelInfo={hotelDetails}
      />
    </div>
  )
}
HotelDetails.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Thông tin chỗ ở'
    }}
    >
      {page}
    </Layout>
  )
}
