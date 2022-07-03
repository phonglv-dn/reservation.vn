import React from 'react'
import { AiOutlineFacebook, AiOutlineTwitter, AiFillYoutube, AiFillInstagram } from 'react-icons/ai'

export default function Contact () {
  return (
    <div className='nc-contact'>
      <div className='container'>
        <div className='nc-contact__title'>
          <h2>LIÊN HỆ</h2>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='nc-contact__text'>
              <h3>🗺 ĐỊA CHỈ</h3>
              <span>Phòng chụp ảnh lăng kính có hình xăm, máy đánh chữ portland taiyaki hoodie neutra</span>
            </div>
            <div className='nc-contact__text'>
              <h3>💌 EMAIL</h3>
              <span>nc.example@example.com</span>
            </div>
            <div className='nc-contact__text'>
              <h3>☎ PHONE</h3>
              <span>000-123-456-7890</span>
            </div>
            <div className='nc-contact__text'>
              <h3>🌏 SOCIALS</h3>
              <ul className='nc-contact__icon'>
                <li><a><AiOutlineFacebook /></a></li>
                <li><a><AiOutlineTwitter /></a></li>
                <li><a><AiFillYoutube /></a></li>
                <li><a><AiFillInstagram /></a></li>
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <form className='nc-contact__form'>
              <label className='d-block nc-contact__lable'>
                <label>Họ và Tên</label>
                <input type='text' placeholder='Nguyễn Văn A' className='w-100 nc-contact__input' />
              </label>
              <label className='d-block nc-contact__lable'>
                <label>Email</label>
                <input type='email' placeholder='example@gmail.com' className='w-100 nc-contact__input' />
              </label>
              <label className='d-block nc-contact__lable'>
                <label>Tin Nhắn</label>
                <textarea rows='6' className='w-100 nc-contact__input' />
              </label>
              <div className='nc-contact__btn'>
                <button>Gửi tin nhắn</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
