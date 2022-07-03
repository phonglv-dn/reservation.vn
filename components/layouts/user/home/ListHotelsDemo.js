import StayCard from '../StayCard'
import { useState, useEffect } from 'react'
import axios from '../../../../network/axios'

export default function ListHotelsDemo () {
  const [hotels, setHotels] = useState([])
  const [visible, setVisible] = useState(8)
  const [btnShowMore, setBtnShowMore] = useState(true)

  const showMoreItems = () => {
    if (visible > hotels.length) {
      setBtnShowMore(false)
    }
    return setVisible(prevValue => prevValue + 4)
  }

  const getHotels = async () => {
    const res = await axios({
      url: 'http://localhost:3001/api/hotels/'
    })
    const hotels = await res.data.hotels
    setHotels(hotels)
  }
  useEffect(() => {
    getHotels()
  }, [])
  return (
    <div className='position-relative py-5'>
      <div className='us-background-section container positionabsolute w-100'>
        <div className='us-section-grid-demo-hotels position-relative row'>
          <div className='d-flex flex-column mb-4 position-relative'>
            <div className='us-section-heading position-relative d-flex flex-collumn flex-sm-row align-items-sm-end justify-content-between mb-5 text-neutral-900'>
              <div className='us-section-title'>
                <h2 className='text-3xl md:text-4xl font-semibold'>Danh sách khách sạn mới nhất</h2>
                <span className='mt-1 mt-md-2 font-normal d-block text-base text-neutral-500'>Đây chỉ là những khách sạn do chúng tôi thử nghiệm</span>
              </div>
            </div>
          </div>
          <div className='row home-list-hotels__main'>
            {
                hotels?.slice(0, visible).map((item, index) => {
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
            {
              btnShowMore &&
                <div className='btn-show-more__wrap d-flex justify-content-center pt-4'>
                  <button className='us-button btn-show-more position-relative d-inline-flex align-items-center justify-content-center text-sm font-medium ttnc-button-primary text-neutral-50 px-4 py-3' onClick={showMoreItems}>Hiển thị thêm</button>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
