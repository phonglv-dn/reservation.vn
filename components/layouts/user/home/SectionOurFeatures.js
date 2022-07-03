import React from 'react'

export default function SectionOurFeatures () {
  const features = [
    {
      colorTag: 'text-blue-800 bg-blue-100',
      tag: 'Quảng cáo',
      title: 'Quảng cáo hiệu quả',
      sub: 'Với danh sách miễn phí, bạn có thể quảng cáo khách sạn của mình mà không cần trả trước chi phí'
    },
    {
      colorTag: 'text-green-800 bg-green-100',
      tag: 'Tiếp cận',
      title: 'Tiếp cận tới hàng triệu người',
      sub: 'Hàng triệu người đang tìm kiếm những nơi độc đáo để ở trên khắp thế giới'
    },
    {
      colorTag: 'text-red-800 bg-red-100',
      tag: 'An toàn',
      title: 'An toàn và đơn giản',
      sub: 'Danh sách Cho thuê kỳ nghỉ cung cấp cho bạn một cách an toàn và dễ dàng để đặt phòng và thanh toán trực tuyến'
    }
  ]
  return (
    <div className='us-section-our-features container position-relative d-flex flex-column align-items-center flex-lg-row'>
      <div className='us-features-left flex-grow-1'>
        <div className='us-features-image'>
          <img src='https://chisnghiax.com/chisfis/static/media/our-features.d69027726b5a972c1b17.png' />
        </div>
      </div>
      <div className='us-features-right flex-shrink-0'>
        <span className='text-uppercase text-sm text-gray-400 tracking-widest'>
          Lợi ích
        </span>
        <h2 className='font-semibold text-4xl mt-3'>Tại Reservation.vn</h2>
        {
          features.map((item, index) => {
            return (
              <ul key={index} className='us-features-contents'>
                <li>
                  <span className={`us-feature-tag d-inline-flex font-medium text-xs position-relative  + ${item.colorTag}`}>{item.tag}</span>
                  <span className='us-feature-title d-block text-xl font-semibold'>{item.title}</span>
                  <span className='us-feature-sub d-block text-neutral-500'>{item.sub}</span>
                </li>
              </ul>
            )
          })
        }
      </div>
    </div>
  )
}
