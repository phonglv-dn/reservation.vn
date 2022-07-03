import axios from '../../../network/axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import FormData from 'form-data'

export default function ProfileAdmin () {
  const cookies = new Cookies()
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    email: ''
  })
  const user = cookies.get('userInfo')
  const getData = () => {
    if (user) {
      setData({
        name: user.name,
        email: user.email
      })
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    try {
      await axios.put('/api/admin/me', formData)
      toast.success('Cập nhật thành công !')
      const user = await axios.get('/api/admin/me')
      cookies.set('userInfo', user?.data.user, { path: '/' })
      router.reload('/admin/profile')
    } catch (e) {
      toast.error(e?.response?.data?.msg)
    }
  }
  return (
    <div className='page-wrapper__admin col-lg-9 '>
      <div className='col-xlg-8 col-md-12'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit} className='form-horizontal form-material'>
              <div className='form-group mb-4'>
                <label className='col-md-12 p-0'>Họ và Tên</label>
                <div className='col-md-12 border-bottom p-0'>
                  <input
                    type='text' placeholder={data.name}
                    className='form-control p-0 border-0'
                    onChange={handleChange}
                    name='name'
                    value={data.name}
                  />
                </div>
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='email' className='col-md-12 p-0'>Email</label>
                <div className='col-md-12 border-bottom p-0'>
                  <input
                    type='email' placeholder='admin123@admin.com'
                    className='form-control p-0 border-0'
                    id='example-email'
                    name='email'
                    onChange={handleChange}
                    value={data.email}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <button className='btn btn-success' type='submit'>Cập nhật thông tin</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
