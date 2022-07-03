import React from 'react'
import Layout from '../../components/layouts/admin/Layout'
import ManageHotel from '../../components/layouts/admin/ManageHotel'

export default function manageHotels () {
  return (
    <ManageHotel />
  )
}
manageHotels.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Manage Users'
    }}
    >
      {page}
    </Layout>
  )
}
