import React from 'react'
import About from '../components/layouts/user/About'
import HomeContact from '../components/layouts/user/HomeContact'
import Layout from '../components/layouts/user/Layout'

export default function about () {
  return (
    <>
      <About />
      <HomeContact />
    </>
  )
}
about.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'About'
    }}
    >
      {page}
    </Layout>
  )
}
