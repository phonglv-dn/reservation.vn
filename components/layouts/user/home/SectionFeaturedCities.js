import React, { useEffect, useState, useRef } from 'react'
import axios from '../../../../network/axios'
import CityCard from '../CityCard'
import Slider from 'react-slick'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

export default function SectionFeaturedCities () {
  const ref = useRef({})

  const next = () => {
    ref.current.slickNext()
  }

  const previous = () => {
    ref.current.slickPrev()
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 300,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  const [cities, setCities] = useState([])
  const getCities = async () => {
    axios({
      url: '/api/cities'
    }).then((res) => {
      setCities(res.data.cities)
    })
  }
  useEffect(() => {
    getCities()
  }, [])
  return (
    <div className='us-section-common'>
      <div className='section-common__home container'>
        <div className='us-section-heading position-relative d-flex flex-column flex-sm-row align-items-sm-end justify-content-between text-neutral-900'>
          <div className='section-heading__wrap'>
            <h2 className='section-heading__wrap--title font-semibold'>Các thành phố nổi bật nhất</h2>
            <p className='section-heading__wrap--sub font-normal d-block text-base text-neutral-500'>
              Các thành phố mà mọi người có xu hướng đến nhiều trong thời gian gần đây
            </p>
          </div>
          <div className='related-hotels__btn me-4'>
            <button className='button related-hotels__btn--left' onClick={previous}>
              <RiArrowLeftSLine />
            </button>
            <button className='button related-hotels__btn--right' onClick={next}>
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
        <div className='common-list overflow-hidden'>
          <Slider ref={ref} {...settings}>
            {
              cities?.map((item, index) => {
                return (
                  <div key={index}>
                    <CityCard
                      slug={item.slug}
                      name={item.name}
                      cityPicUrl={item.cityPicUrl}
                    />
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}
