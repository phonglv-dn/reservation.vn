import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import axios from '../../../network/axios'
import FormData from 'form-data'
import { useRouter } from 'next/router'

export default function UpdateAvatar () {
  const cookies = new Cookies()
  const router = useRouter()
  const [data, setData] = useState({
    profilePicUrl: ''
  })
  const user = cookies.get('userInfo')
  const getData = () => {
    if (user) {
      setData({
        profilePicUrl: user.profilePicUrl
      })
    }
  }
  useEffect(() => {
    getData()
  }, [router])
  const handleSubmit = async (e) => {
    const formData = new FormData()
    formData.append('profilePic', e.target.files[0])
    e.preventDefault()
    const response = await axios.put('/api/admin/me', formData)
    setData({
      ...response.data.user
    })
    cookies.set('userInfo', response?.data?.user, { path: '/' })
    toast.success('Cập nhật thành công !')
  }
  return (
    <div className='update-avataradmin col-lg-3'>
      <div className=''>
        <div className='box-border'>
          <div className='user-bg'>
            <div className='overlay-box'>
              <div className='title-update-avatar title'>
                <h1 className='p-1'>Ảnh đại diện</h1>
              </div>
              <div className='user-content'>
                <div className='avatar-wrapper position-relative d-block align-items-center overflow-hidden'>
                  <div className='form-group mb-4 admin-avatar position-relative flex-shrink-0 d-inline-flex overflow-hidden align-items-center justify-content-center text-neutral-100'>
                    <img src={data.profilePicUrl} width={120} height={120} className='img-avatar-admin' />
                    <div className='adm-changeimg position-absolute top-0 start-0 bottom-0 end-0 bg-black bg-opacity-60 d-flex flex-column text-center align-items-center justify-content-center text-neutral-50'>
                      <span>Thay đổi</span>
                      <input onChange={handleSubmit} name='profilePicUrl' type='file' className='position-absolute top-0 start-0 bottom-0 end-0 opacity-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
