import React from 'react'
import CityCard from '../CityCard'

export default function SectionHomeBlogs () {
  return (
    <div className='us-section-home-blogs position-relative'>
      <div className='us-section-common mt-0'>
        <div className='section-common__home'>
          <div className='us-section-heading position-relative d-flex flex-column flex-sm-row align-items-sm-end justify-content-between text-neutral-900'>
            <div className='section-heading__wrap'>
              <h2 className='section-heading__wrap--title font-semibold'>Blogs</h2>
              <span className='section-heading__wrap--sub font-normal d-block text-base text-neutral-500'>
                Đề xuất về những nơi, những trải nghiệm mà bạn cần biết trước khi đi du lịch
              </span>
            </div>
          </div>
          <div className='common-list overflow-hidden'>
            <ul>
              <li>
                <CityCard author='admin' date='19/05/2022' name='Nên mua gì khi du lịch Hồ Chí Minh' cityPicUrl='https://statics.vinpearl.com/cho-ben-thanh-o-dau-31_1625754800.jpg' />
              </li>
              <li>
                <CityCard author='admin' date='25/05/2022' name='Những MV khiến bạn muốn xách balo lên và đi du lịch Việt Nam luôn và ngay!' cityPicUrl='https://afamilycdn.com/2017/vicky-nhung-dsc-7399-copy-1499226718304.jpg' />
              </li>
              <li>
                <CityCard author='admin' date='13/03/2022' name='Nên mua gì khi du lịch Hội An' cityPicUrl='https://alsaharhoian.com/wp-content/uploads/2021/05/ln-1024x681.jpg' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
