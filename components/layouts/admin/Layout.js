import Header from './Header'
import LeftSidebar from './LeftSidebar'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'

export default function Layout ({ children, pageMeta }) {
  const meta = {
    title: 'Reservation.vn',
    description: 'Yolo !!!',
    type: 'website',
    ...pageMeta
  }
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{meta.title} || Reservation.vn</title>
        <meta name='description' content={meta.description} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Reservation.vn' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:url' content={`/${router.asPath}`} />
        <meta property='og:title' content={meta.title} />
        <link rel='icon' href='/googlemaps.svg' />
      </Head>
      {/* <MyHead pageMeta={pageMeta} /> */}
      <Header />
      <LeftSidebar />
      <main>{children}</main>
      <ToastContainer
        position='top-center'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
