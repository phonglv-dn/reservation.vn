import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layouts/user/Layout'
import axios from '../../network/axios'
import { useRouter } from 'next/router'
import SectionHero from '../../components/layouts/user/home/SectionHero'
import StayCard from '../../components/layouts/user/StayCard'
import FullPageLoader from '../../components/layouts/user/loader/FullPageLoader'

export default function Hotels () {
  const [numOfHotels, setNumOfHotels] = useState(null)
  const [hotels, setHotels] = useState([])
  const [cityInfo, setCityInfo] = useState({
    name: ''
  })
  const [empty, setEmpty] = useState(false)
  // const [visible, setVisible] = useState(8) TODO: Set số lượng hiện thị mặc định khách sạn
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const slug = router.query.slugCity
  useEffect(async () => {
    setLoading(true)
    const res = await axios.post('/api/hotels/by-city', { slug: slug })
    setCityInfo(res?.data?.city)
    if (res?.data?.result?.length > 0) {
      setNumOfHotels(res?.data?.length)
      setHotels(res?.data?.result)
      return setLoading(false)
    } else {
      setEmpty(true)
      return setLoading(false)
    }
  }, [router])
  if (loading === false) {
    return (
      <div className='container position-relative overflow-hidden'>
        <Head>
          <title>{cityInfo.name} || Reservation.vn</title>
  
        </Head>
        <div className='us-bg-glassmorphism position-absolute d-flex overflow-hidden'>
          <span className='d-block' />
          <span className='d-block' />
        </div>
        <SectionHero
          name={cityInfo.name}
          sub={cityInfo.desc}
          location={cityInfo.name}
          btnStart='d-none'
          image={cityInfo.cityPicUrl}
          amount={numOfHotels}
        />
        <div className='position-relative mt-5 py-5'>
          <div className='us-background-section positionabsolute w-100'>
            <div className='us-section-grid-demo-hotels position-relative row'>
              <div className='d-flex flex-column mb-4 position-relative'>
                <div className='us-section-heading position-relative d-flex flex-collumn flex-sm-row align-items-sm-end justify-content-between mb-5 text-neutral-900'>
                  <div className='us-section-title'>
                    <h2 className='text-3xl md:text-4xl font-semibold'>Danh sách khách sạn của {cityInfo.name}</h2>
                    <span className='mt-1 mt-md-2 font-normal d-block text-base text-neutral-500'>Đây là danh sách tất cả khách sạn của thành phố {cityInfo.name} hiện tại</span>
                  </div>
                </div>
              </div>
              {
                empty &&
                  <p className='home-list-hotels__main text-center text-lg'>
                    Hiện chưa có khách sạn nào được thêm vào
                  </p>
              }
              {
                !empty &&
                  <div className='row home-list-hotels__main'>
                    {
                      hotels?.map((item, index) => {
                        return (
                          <div key={index} className='d-grid mb-4 col-12 gap-4 gap-md-5 col-sm-6 col-lg-4 col-xl-3'>
                            <StayCard
                              _id={item._id}
                              hotelPicsUrl={item.hotelPicsUrl[0]}
                              ratingStar={item.ratingStar}
                              name={item.name}
                              address={item.address}
                              description={item.description}
                            />
                          </div>
                        )
                      })
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <FullPageLoader />
  }
}
Hotels.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Danh sách chỗ ở'
    }}
    >
      {page}
    </Layout>
  )
}
