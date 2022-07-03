import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from '../../network/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import FormData from 'form-data'
import Me from '.'
import Layout from '../../components/layouts/user/Layout'
import { css } from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default function AccountInfo () {
  const cookies = new Cookies()
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    profilePicUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const user = cookies.get('userInfo')

  const getProfileData = async () => {
    if (user) {
      setProfileData({
        profilePicUrl: user.profilePicUrl
      })
    }
  }
  useEffect(() => {
    getProfileData()
  }, [router])
  const updateAvatar = (e, actions) => {
    const formData = new FormData()
    formData.append('profilePic', e.target.files[0])
    setLoading(true)
    axios({
      url: '/api/auth/me',
      method: 'PUT',
      data: formData
    }).then(res => {
      setProfileData({
        ...res.data.user
      })
      cookies.set('userInfo', res.data.user, { path: '/' })
      toast.success('Cập nhật avatar thành công !')
      setLoading(false)
    }).catch(err => {
      toast.error(err?.response?.data?.msg)
      setLoading(false)
    }).finally(_ => {
      setLoading(false)
    })
  }
  return (
    <div className='avatar-wrapper position-relative d-flex align-items-center justify-content-around overflow-hidden py-3 mb-3'>
      <div className='wil-avatar position-relative flex-shrink-0 d-inline-flex overflow-hidden align-items-center justify-content-center text-neutral-100'>
        {loading && <div className='updating-avt'><div className='coating' /><SyncLoader color='#4F46E5' loading={loading} speedMultiplier={0.5} css={override} size={20} /></div>}
        <div><img src={profileData.profilePicUrl} width={170} height={170} /></div>
        {!loading &&
          <div className='black-coating position-absolute top-0 start-0 bottom-0 end-0 bg-black bg-opacity-60 d-flex flex-column text-center align-items-center justify-content-center text-neutral-50'>
            <span>Đổi ảnh đại diện</span>
            <input
              type='file'
              onChange={updateAvatar}
              value=''
              name='profilePicUrl' className='position-absolute top-0 start-0 bottom-0 end-0 opacity-0'
              disabled={loading}
            />
          </div>}
      </div>
    </div>
  )
}
AccountInfo.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Me>
        {page}
      </Me>
    </Layout>
  )
}
