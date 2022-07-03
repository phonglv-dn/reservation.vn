import React from 'react'

export default function BlogItem ({ image, title, author, date }) {
  return (
    <div className='blog-card__card rounded-3xl overflow-hidden'>
      <div className='blog-card__img'>
        <img src={image} alt={title} />
      </div>
      <div className='blog-card__bg'>
        <div />
      </div>
      <div className='d-flex blog-card__text'>
        <p className='blog-card__text--cate'>Danh mục</p>
        <h2>{title}</h2>
        <div className='d-flex text-xs text-neutral-300'>
          <span className='d-block block text-neutral-200 font-medium truncate'>{author}</span>
          <span className='mx-1.5 font-medium'>.</span>
          <span className='font-normal truncate'>{date}</span>
        </div>
      </div>
    </div>
  )
}
