import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IoChevronUpOutline } from 'react-icons/io5'
import throttle from 'lodash/throttle'

export default function Layout ({ children, pageMeta, pageProps }) {
  const meta = {
    title: 'Reservation.vn',
    description: 'Yolo !!!',
    type: 'website',
    ...pageMeta
  }
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    })
  }
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...pageProps })
    }
    return child
  })
  const onScroll = (e) => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }
  useEffect(() => {
    const throttledOnScroll = throttle(onScroll, 99999)
    window.addEventListener('scroll', throttledOnScroll)
  }, [])
  return (
    <>
      <Head>
        <title>{meta.title} || Reservation.vn</title>
        <meta name='description' content={meta.description} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Reservation.vn' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:url' content={`http://localhost:3001/${router.asPath}`} />
        <meta property='og:title' content={meta.title} />
        <link rel='icon' href='/official-favicon.png' />
      </Head>
      <ToastContainer
        position='bottom-left'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <main className='pt-3'>{childrenWithProps}</main>
      <Footer />
      {
        showButton &&
          <div className='position-fixed bottom-0 end-0 m-4'>
            <button onClick={(() => scrollToTop())} className='back-to-top p-2'>
              <IoChevronUpOutline />
            </button>
          </div>
      }
    </>
  )
}
