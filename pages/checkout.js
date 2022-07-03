import React from 'react'
import Layout from '../components/layouts/user/Layout'
import Checkout from '../components/layouts/user/Checkout'

export default function checkout () {
  return (
    <Checkout />
  )
}
checkout.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Check out'
    }}
    >
      {page}
    </Layout>
  )
}
