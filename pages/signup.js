import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../components/layouts/user/Layout'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import InputForm from '../components/layouts/user/InputForm'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Độ dài tên quá ngắn.!')
    .max(30, 'Độ dài tên quá dài.!')
    .required('Không được để trống'),
  email: Yup.string()
    .lowercase()
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Vui lòng nhập một địa chỉ email hợp lệ')
    .email(''),
  password: Yup.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự.!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Mật khẩu phải có ít nhất 1 chữ cái in hoa, một chữ cái thường và một số !')
    .required('Không được để trống'),
  repeatPwd: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại chưa trùng')
    .required('Không được để trống')
})

export default function Signup () {
  const router = useRouter()
  const cookies = new Cookies()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPwd: ''
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    setProfileData(values)
    axios({
      method: 'POST',
      url: '/api/auth/signup',
      data: values,
      headers: { 'content-type': 'application/json' }
    }).then(async (response) => {
      toast.success(response?.data?.msg)
      if (response.data.token) {
        cookies.set('accessToken', response.data.token, { path: '/' })
        cookies.set('userInfo', response.data.user, { path: '/' })
        actions.setSubmitting(false)
        const roomInfo = window.sessionStorage.getItem('roomInfo')
        if (roomInfo) {
          return setTimeout(() => { router.push('/checkout') }, 1500)
        }
        return setTimeout(() => { router.push('/') }, 1500)
      }
      throw new Error('Không tìm thấy token')
    }).catch(err => {
      toast.error(err?.response?.data?.msg)
      actions.setSubmitting(false)
    })
  }
  return (
    <div className='us-signup' id='signup'>
      <Container className='us-signup__container'>
        <div className='us-signup__wrap p-5'>
          <h2 className='us-signup__title d-flex align-items-center justify-content-center fw-bold'>Đăng ký</h2>
          <div className='us-signup__contents'>
            <Formik
              initialValues={profileData}
              validationSchema={schema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className='d-grid gap-2 us-signup__contents--form my-2'>
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
                    id='name'
                    name='name'
                    titleLabel='Tên'
                    type='text'
                    component={InputForm}
                    errors={errors.name}
                    touched={touched.name}
                    placeholder='Nhập tên của bạn'
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
                  <Field
                    id='repeatPwd'
                    name='repeatPwd'
                    titleLabel='Nhập lại mật khẩu'
                    type='password'
                    errors={errors.repeatPwd}
                    component={InputForm}
                    touched={touched.repeatPwd}
                    placeholder='Nhập lại mật khẩu của bạn'
                  />
                  <button
                    type='submit'
                    className='nc-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5 mt-3'
                    disabled={isSubmitting}
                  >
                    Đăng ký
                  </button>
                </Form>
              )}
            </Formik>
            <span className='already-have-an-account d-block text-center'>Bạn đã có tài khoảng? <Link href='/login'><a>Đăng nhập</a></Link></span>
          </div>
        </div>
      </Container>
    </div>
  )
}
Signup.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Đăng ký'
    }}
    >
      {page}
    </Layout>
  )
}
