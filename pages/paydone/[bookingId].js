import React from 'react'
import Layout from '../../components/layouts/user/Layout'
import Paydone from '../../components/layouts/user/Paydone'

export default function paydone () {
  return (
    <Paydone />
  )
}
paydone.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Thanh toán'
    }}
    >
      {page}
    </Layout>
  )
}
