import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

export default function FullPageLoader () {
  return (
    <div className='loader-container'>
      <HashLoader
        color='#4F46E5'
        loading
        margin={6}
        size={36}
        speedMultiplier={1}
      />
    </div>
  )
}
