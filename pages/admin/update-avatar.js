import React from 'react'
import UpdateAvatar from '../../components/layouts/admin/UpdateAvatar'
import Layout from '../../components/layouts/admin/Layout'

export default function updateAvatar () {
  return (
    <UpdateAvatar />
  )
}
updateAvatar.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Cập nhật ảnh đại diện'
    }}
    >
      {page}
    </Layout>
  )
}
