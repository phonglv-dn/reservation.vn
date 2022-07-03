import { Container } from 'react-bootstrap'
import Link from 'next/link'
import Layout from '../components/layouts/user/Layout'
import axios from '../network/axios'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import InputForm from '../components/layouts/user/InputForm'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .required('Không được để trống')
    .email('Vui lòng nhập đúng định dạng'),
  password: Yup.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự.!')
    .required('Không được để trống')
})

export default function Login () {
  const router = useRouter()
  const cookies = new Cookies()
  const [profileData, setProfileData] = useState({
    email: '',
    password: '',
    phone: ''
  })
  const user = cookies.get('userInfo')

  const getProfileData = async () => {
    if (user) {
      setProfileData({
        email: user.email,
        password: user.password,
        phone: user.phone
      })
    }
  }

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    axios({
      method: 'POST',
      url: '/api/auth',
      data: values
    }).then(async (response) => {
      if (response.data.token) {
        cookies.set('accessToken', response.data.token, { path: '/' })
        const user = await axios.get('/api/auth/me')
        cookies.set('userInfo', user?.data?.user, { path: '/' })
        actions.setSubmitting(false)
        const roomInfo = window.sessionStorage.getItem('roomInfo')
        if (roomInfo) {
          return setTimeout(() => { router.push('/checkout') }, 1500)
        }
        return router.push('/')
      }
      throw new Error('Không tìm thấy token')
    }).catch(err => {
      toast.error(err?.response?.data?.msg)
      actions.setSubmitting(false)
    })
  }
  useEffect(() => {
    getProfileData()
  }, [router])
  return (
    <div>
      <div className='us-login text-center text-base'>
        <Container className='us-login__container'>
          <div className='us-login__wrap p-5'>
            <h2 className='text-center mb-3 fw-bold us-login__tilte'>Đăng nhập</h2>
            <Formik
              initialValues={profileData}
              validationSchema={schema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className='d-grid gap-2 us-signup__contents--form mb-2'>
                  <Field
                    id='email'
                    name='email'
                    titleLabel='Email'
                    type='email'
                    component={InputForm}
                    errors={errors.email}
                    touched={touched.email}
                    placeholder='Nhập email của bạn'
                  />
                  <Field
                    id='password'
                    name='password'
                    titleLabel='Mật khẩu'
                    type='password'
                    errors={errors.password}
                    component={InputForm}
                    touched={touched.password}
                    placeholder='Nhập mật khẩu của bạn'
                  />
                  <button
                    type='submit'
                    className='nc-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5 mt-3'
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </button>
                </Form>
              )}
            </Formik>
            <span className='already-have-an-account d-block text-center'>
              Người dùng mới? <Link href='/signup'><a>Tạo tài khoản mới</a></Link>
            </span>
          </div>
        </Container>
      </div>
    </div>
  )
}
Login.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Đăng nhập'
    }}
    >
      {page}
    </Layout>
  )
}
