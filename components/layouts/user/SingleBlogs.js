import React from 'react'
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineYoutube, AiOutlineInstagram } from 'react-icons/ai'

export default function SingleBlogs () {
  return (
    <div className='single-blog'>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='single-blog__header'>
            <a className='single-blog__header--badge'>Du Lịch</a>
            <h1>Giữ vững tinh thần khát khao đi du lịch vòng quanh thế giới</h1>
            <span className='text-blur'>Chúng tôi là tạp chí trực tuyến chuyên đưa tin về những gì tốt nhất trong thiết kế sản phẩm quốc tế. Chúng tôi bắt đầu như một blog nhỏ vào năm 2002 bao gồm các bài tập của sinh viên và theo thời gian</span>
            <div className='single-blog__header--border' />
            <div className='single-blog__header--bot d-flex justify-content-between mt-5'>
              <div>
                <div className='d-flex align-items-center'>
                  <img src='https://repository-images.githubusercontent.com/270184602/35fcef00-a8e4-11ea-9513-188fa6d16800' />
                  <div className='ml-3'>
                    <div>
                      <a className='font-semibold'>Tommy Tèo</a>
                    </div>
                    <div className='mt-1'>
                      <span className='text-xs'>May 20, 2021</span>
                      <span className='mx-1.5 font-medium'>.</span>
                      <span className='text-xs'>6 phút đọc</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <nav>
                  <i><AiOutlineFacebook /></i>
                  <i><AiOutlineTwitter /></i>
                  <i><AiOutlineYoutube /></i>
                  <i><AiOutlineInstagram /></i>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className='single-blog__img-top container mt-5 mb-5'>
          <img src='https://digital.ihg.com/is/image/ihg/intercontinental-danang-5630627675-2x1?fit=fit,1&wid=2400&hei=1200&qlt=85,0&resMode=sharp2&op_usm=1.75,0.9,2,0' />
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='single-blog__content '>
            <h3>Trải nghiệm dịch vụ đẳng cấp thế giới ở InterContinental Danang Sun Peninsula Resort, an IHG Hotel</h3>
            <p>Tự hào cung cấp các lựa chọn ăn uống tuyệt hảo như La Maison 1888 danh tiếng, InterContinental Danang Sun Peninsula Resort đem đến cho du khách nơi lánh mình sang trọng với bãi biển riêng, hồ bơi lớn ngoài trời và spa. Du khách có thể ngắm nhìn quang cảnh biển tuyệt đẹp từ resort.</p>
            <br />
            <p>Toàn bộ chỗ ở tại đây đều được bài trí sang trọng và có ban công riêng. Các biệt thự bên bờ biển của resort nằm ẩn mình giữa những tảng đá hùng vĩ tại chân núi và có hồ bơi riêng, hiên tắm nắng cùng các tiện nghi phòng tắm sang trọng. Một số phòng chọn lọc đi kèm bồn tắm spa và hiên ăn uống riêng nhìn ra quang cảnh biển tuyệt đẹp.</p>
            <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/100073246.jpg?k=7658d60973e6e33555df5d820d6fcfcb644a9739a0999a2766081c197c3e11a0&o=&hp=1' />
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='single-blog__comment'>
            <div className='single-blog__comment--author d-flex align-items-center'>
              <div><img src='https://repository-images.githubusercontent.com/270184602/35fcef00-a8e4-11ea-9513-188fa6d16800' /></div>
              <div className='mx-3'>
                <span className='text-blur'>ĐƯỢC VIẾT BỞI</span>
                <h2 className='font-semibold mt-2 mb-2'>Tommy Tèo</h2>
                <span className='text-blur'>Chỗ nghỉ này thuộc chương trình Du lịch Bền vững, có nghĩa là chỗ nghỉ có áp dụng các bước rõ rệt để giúp kỳ lưu trú của bạn trở nên bền vững hơn.</span>
              </div>
            </div>
            <div className='single-blog__comment--form pt-5'>
              <h3 className='font-semibold mb-3'>Phản Hồi</h3>
              <form>
                <textarea className='w-100 text-sm' rows='4' />
                <div className='mt-3'>
                  <button className='button--submit' type='submit'>Gửi</button>
                  <button className='mx-3 button--cancel'>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
