import React from 'react'
import Layout from '../../components/layouts/admin/Layout'

export default function Dashboard () {
  return (
    <></>
  )
}
Dashboard.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Trang chủ'
    }}
    >
      {page}
    </Layout>
  )
}
