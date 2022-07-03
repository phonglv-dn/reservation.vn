import React, { useRef, useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import Slider from 'react-slick'

export default function PopupImage ({ hotelPicsUrl, setOpen }) {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const slider1 = useRef(null)
  const slider2 = useRef(null)

  const next = () => {
    slider1.current.slickNext()
  }

  const previous = () => {
    slider1.current.slickPrev()
  }

  useEffect(() => {
    setNav1(slider1.current)
    setNav2(slider2.current)
  }, [])

  return (
    <div className='popup-image position-absolute top-0 bottom-0 start-0 end-0 container'>
      <div className='modal-hotel-wrap'>
        <button
          className='position-fixed pi-btn-close d-flex justify-content-center align-items-center'
          onClick={(() => {
            setOpen(false)
          })}
        >
          <IoClose />
        </button>
        <div className='img-modal container overflow-hidden'>
          <div className='row align-items-center justify-content-center position-relative'>
            <div className='img-modal__btn  position-absolute'>
              <button className='button img-modal__btn__btn--left' onClick={previous}>
                <i><RiArrowLeftSLine /></i>
              </button>
              <button className='button img-modal__btn__btn--right' onClick={next}>
                <i><RiArrowRightSLine /></i>
              </button>
            </div>
            <Slider
              arrows
              slidesToShow={1}
              slidesToScroll={1}
              asNavFor={nav2}
              ref={slider1}
            >
              {
                hotelPicsUrl?.map((pic, index) => {
                  return (
                    <div key={index}>
                      <div className='img-modal__top col-12 d-flex justify-content-center text-center overflow-hidden'>
                        <img src={pic} className='main-modal' />
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
          <div className='row align-items-center justify-content-center px-5'>
            <Slider
              ref={slider2}
              slidesToShow={3}
              slidesToScroll={1}
              asNavFor={nav1}
              centerMode
              focusOnSelect
            >
              {
                hotelPicsUrl?.map((pic, index) => {
                  return (
                    <div key={index}>
                      <div className='img-modal__bottom position-relative d-flex align-items-center justify-content-center overflow-hidden'>
                        <img src={pic} className='sub-modal position-absolute' />
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}
