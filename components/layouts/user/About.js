import React from 'react'

export default function About () {
  return (
    <div className='container mt-5'>
      <div className='about-us mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-5 about-us__text'>
            <h2>👋 Về chúng tôi.</h2>
            <span>Chúng tôi vô tư và độc lập, hàng ngày chúng tôi tạo ra các chương trình và nội dung đẳng cấp thế giới, đặc biệt để thông báo, giáo dục và giải trí cho hàng triệu người trên khắp thế giới.</span>
          </div>
          <div className='col-md-7 about-us__img'>
            <img src='https://chisnghiax.com/chisfis/static/media/about-hero-right.534fc28b738f026ab253.png' />
          </div>
        </div>
      </div>
      <div className='founder mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-6 founder__text'>
            <h2>⛱️ Người sáng lập</h2>
            <span>Chúng tôi vô tư và độc lập và mỗi ngày chúng tôi đều tạo ra
              chương trình và nội dung đẳng cấp thế giới
            </span>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-3 founder__person'>
            <img src='/images/person1.jpg' />
            <h3>Niamh O'Shea</h3>
            <span>Đồng sáng lập, Chủ tịch</span>
          </div>
          <div className='col-md-3 founder__person'>
            <img src='/images/person2.jpg' />
            <h3>Danien Jame</h3>
            <span>Giám đốc điều hành</span>
          </div>
          <div className='col-md-3 founder__person'>
            <img src='/images/person3.jpg' />
            <h3>Orla Dwyer</h3>
            <span>Giám đốc chiến lược</span>
          </div>
          <div className='col-md-3 founder__person'>
            <img src='/images/person4.jpg' />
            <h3>Dara Frazier</h3>
            <span>Giám đốc điều hành</span>
          </div>
        </div>
      </div>
      <div className='about-statistical mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-6 about-statistical__title'>
            <h2>🚀 Fast Facts</h2>
            <span>Chúng tôi vô tư và độc lập, hàng ngày chúng tôi tạo ra các chương trình và nội dung đẳng cấp thế giới, đặc biệt</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 about-statistical__text p-3'>
            <h3>10 million</h3>
            <span>Các bài báo đã được công khai trên khắp thế giới (tính đến ngày 30 tháng 9 năm 2021)</span>
          </div>
          <div className='col-md-4 about-statistical__text p-3'>
            <h3>100,000</h3>
            <span>Tài khoản người dùng đã đăng ký (kể từ ngày 30 tháng 9 năm 2021)</span>
          </div>
          <div className='col-md-4 about-statistical__text p-3'>
            <h3>220+</h3>
            <span>Các quốc gia và khu vực có sự hiện diện của chúng tôi (kể từ ngày 30 tháng 9 năm 2021)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
