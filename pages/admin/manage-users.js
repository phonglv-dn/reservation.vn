import React from 'react'
import UserManage from '../../components/layouts/admin/UserManage'
import Layout from '../../components/layouts/admin/Layout'

export default function manageUsers () {
  return (
    <UserManage />
  )
}
manageUsers.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Manage Users'
    }}
    >
      {page}
    </Layout>
  )
}
