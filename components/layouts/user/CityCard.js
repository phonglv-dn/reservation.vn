import React from 'react'
import Link from 'next/link'

export default function CityCard (props) {
  return (
    <>
      <div className={`${props.author ? 'us-blog-card' : 'us-city-card'} us-common-card position-relative overflow-hidden`}>
        <Link href={{
          pathname: `/${props.author ? 'blogs' : 'hotels'}/${props.slug}`
        }}
        >
          <span className='us-card-category d-flex flex-column'>
            <div className='us-image-city flex-shrink-0 d-flex justify-content-center position-relative w-100 overflow-hidden'>
              <img src={props.cityPicUrl ? props.cityPicUrl : 'https://i.pinimg.com/564x/f2/83/a2/f283a2df03ea22a3be1883510f634454.jpg'} />
            </div>
            <div className='mt-3 truncate'>
              {
                props.author && <span className='text-xs text-uppercase'>{props.author} || {props.date}</span>
              }
              <h2 className='text-base text-neutral-900 font-semibold'>{props.name}</h2>
            </div>
          </span>
        </Link>
      </div>
    </>
  )
}
