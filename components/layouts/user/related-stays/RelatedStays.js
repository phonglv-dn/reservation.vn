import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import StayItem from './StayItem'
const listRelatedHotels = [
  {
    name: 'Farm House',
    image: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg',
    location: 'Đà Nẵng'
  },
  {
    name: 'Blue House',
    image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
    location: 'Đà Nẵng'
  },
  {
    name: 'Red House',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
    location: 'Đà Nẵng'
  },
  {
    name: 'Green House',
    image: 'https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg',
    location: 'Đà Nẵng'
  },
  {
    name: 'Pink House',
    image: 'https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg',
    location: 'Đà Nẵng'
  }
]
const SimpleSlider = ({ slideTitle, slideSubTitle }) => {
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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }
  return (
    <div>
      <div className='related-hotels'>
        <div className='container pt-5 pb-5'>
          <div className='related-hotels__title'>
            <h2>{slideTitle}</h2>
            <p>{slideSubTitle}</p>
          </div>
          <Slider ref={ref} {...settings} className='slick-slider'>
            {
              listRelatedHotels.map((hotel, index) => {
                return (
                  <div key={index}>
                    <StayItem
                      image={hotel.image}
                      name={hotel.name}
                      location={hotel.location}
                    />
                  </div>
                )
              })
            }
          </Slider>
          <div className='related-hotels__btn'>
            <button className='button related-hotels__btn--left' onClick={previous}>
              <i><RiArrowLeftSLine /></i>
            </button>
            <button className='button related-hotels__btn--right' onClick={next}>
              <i><RiArrowRightSLine /></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleSlider
