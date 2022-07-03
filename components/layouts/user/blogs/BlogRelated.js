import React, { useRef } from 'react'
import Slider from 'react-slick'
import BlogItem from './BlogItem'

const listBlogRelated = [
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/209002550.jpg?k=2d35a8d558b9fd3e2bf10e073a62ae8bb188649e2dde2104afa1cf784a61409b&o=&hp=1',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/259018483.jpg?k=531273937f9a7a10fc60784cdf3ad9ff6175e279cc9828809bec980ea129987b&o=&hp=1',
    title: 'AI và Nhóm đang mang lại lợi ích cho những bệnh nhân nhỏ nhất như thế nào',
    author: 'Falconar Agnes',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/209001264.jpg?k=28cf75e836a05507564bd7cc6b06fbc6a881fc1f5c5b1aea980c662e12231401&o=&hp=1',
    title: 'Hành trình của DIYer và người dẫn chương trình truyền hình Trisha Hershberger thông qua trò chơi không ngừng phát triển',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/187060449.jpg?k=bc9d68b36e2c6ec95ffc7f13358e3b2e398811a177f5505759bced7a19b52ecc&o=&hp=1',
    title: 'Dụng cụ mới dành cho các bà mẹ mang thai và sau sinh của người da đen để cứu sống',
    author: 'Tousy Vita',
    date: 'May 20, 2021'
  },
  {
    image: 'https://tripi.vn/cdn-cgi/image/width=1280,height=1280/https://storage.googleapis.com/hms_prod/photo/img/1617177652124on/icdn---l_o_n_g-pool-view---copy.jpg',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://tripi.vn/cdn-cgi/image/width=1280,height=1280/https://s3.ap-southeast-1.amazonaws.com/mytourcdn.com/resources/pictures/hotels/6/JJc0tWEcTfK77iQyfA0H5A-53.jpeg',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/202318098.jpg?k=33053ce383fa5cc15e7b5467e61fb4d579293cfdd926c1c2c614d091adccc5e0&o=&hp=1',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/187058893.jpg?k=326519a37fb3e17c9f3c7c84c9ead4936f09f4842bdbb8a78e0c606f9f7162ac&o=&hp=1',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/186894978.jpg?k=91bd0b8b2e614e00ccdd04f5d181bc21569c0aa973bf8b9dc12175ba6933bb1a&o=&hp=1',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  },
  {
    image: 'https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/257135684.jpg?k=c25079516c8bf00797dc63817b05f4ea10aca6eef66768e124f5e747414a532a&o=&hp=1',
    title: 'Các thiết bị thông minh hơn của Lenovo khơi dậy niềm đam mê nghề nghiệp',
    author: 'Foulcher Nathanil',
    date: 'May 20, 2021'
  }
]

const SimpleSlider = props => {
  const ref = useRef({})

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  return (
    <div className='blog-card position-relative'>
      <div className='us-home-blogs-background position-absolute bg-neutral-100' />
      <div className='container'>
        <h2 className='blog-card__title'> Chia sẻ và trải nghiệm du lịch </h2>
        <Slider ref={ref} {...settings}>
          {
            listBlogRelated.map((blog, index) => {
              return (
                <div key={index}>
                  <BlogItem
                    image={blog.image}
                    title={blog.title}
                    author={blog.author}
                    date={blog.date}
                  />
                </div>
              )
            }
            )
          }
        </Slider>
      </div>
    </div>
  )
}

export default SimpleSlider
