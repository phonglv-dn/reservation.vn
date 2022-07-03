import { Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from '../../network/axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import InputForm from '../../components/layouts/admin/InputForm'
import Head from 'next/head'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

const schema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .required('Không được để trống')
    .email('Vui lòng nhập đúng định dạng'),
  password: Yup.string()
})

export default function login ({ children, pageMeta }) {
  const meta = {
    title: 'Đăng nhập',
    description: 'Reservation.vn là một trang web du lịch trực tuyến cho đặt chỗ, được thành lập vào năm 2022. Công ty được vận hành bởi Reservation Holdings, có có trụ sở tại Đà Nẵng',
    type: 'website',
    ...pageMeta
  }
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const cookies = new Cookies()
  const router = useRouter()
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    return axios({
      url: '/api/admin',
      method: 'POST',
      data: values
    }).then(async res => {
      cookies.set('accessToken', res?.data?.token, { path: '/' })
      const user = await axios.get('/api/admin/me')
      cookies.set('userInfo', user?.data?.user, { path: '/' })
      return router.push('/admin/profile')
    }).catch(err => {
      toast.error(err?.response?.data?.msg)
    })
  }
  const user = cookies.get('userInfo')

  const getData = async () => {
    if (user) {
      setData(user)
    }
  }
  useEffect(() => {
    getData()
  }, [router])
  return (
    <>
      <Head>
        <title>{meta.title} || Reservation.vn</title>
        <meta name='description' content={meta.description} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Reservation.vn' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:url' content={`http://localhost:3001/${router.asPath}`} />
        <meta property='og:title' content={meta.title} />
        <link rel='icon' href='/googlemaps.svg' />
      </Head>
      <div>
        <div className='nc-PageLogin text-center text-base'>
          <Container className='us-login__container'>
            <div className='us-login__wrap p-5'>
              <h2 className='text-center mb-3 fw-bold us-login__tilte'>Đăng nhập</h2>
              <Formik
                initialValues={data}
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
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}
