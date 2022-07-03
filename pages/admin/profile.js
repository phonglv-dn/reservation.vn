import React from 'react'
import ProfileAdmin from '../../components/layouts/admin/ProfileAdmin'
import Layout from '../../components/layouts/admin/Layout'
import UpdateAvatar from '../../components/layouts/admin/UpdateAvatar'

export default function profileAdmin () {
  return (
    <div className='container profile-ad__container'>
      <div className='row'>
        <UpdateAvatar />
        <ProfileAdmin />
      </div>
    </div>
  )
}
profileAdmin.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Profile Admin'
    }}
    >
      {page}
    </Layout>
  )
}
