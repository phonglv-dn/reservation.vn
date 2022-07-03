import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function HomeContact () {
  return (
    <div className='mt-5 py-5'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-5 contact-text'>
            <h2>Tham gia bản tin của chúng tôi 🎉</h2>
            <p className='contact-text__description'>Đọc và chia sẻ quan điểm mới về bất kỳ chủ đề nào. Mọi người đều được chào đón.</p>
            <ul className='contact-text__promotion'>
              <li className='d-flex align-items-center'>
                <span className='contact-text__number1'>01</span>
                <span className='contact-text__text'>Nhận chiết khấu nhiều hơn</span>
              </li>
              <li className='d-flex align-items-center mt-3'>
                <span className='contact-text__number2'>02</span>
                <span className='contact-text__text'>Nhận tạp chí cao cấp</span>
              </li>
            </ul>
            <form className='home-contact__form'>
              <input placeholder='Nhập email của bạn' type='email' className='w-100' />
              <button type='submit'><AiOutlineArrowRight /></button>
            </form>
          </div>
          <div className='col-lg-7'>
            <div className='home-contact__img'>
              <img src='https://chisnghiax.com/chisfis/static/media/SVG-subcribe2.efb832b25bd6eca32484.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
