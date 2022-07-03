import { Container } from 'react-bootstrap'
import Layout from '../../components/layouts/admin/Layout'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import axios from '../../network/axios'
import { Formik, Form, Field } from 'formik'
import InputForm from '../../components/layouts/admin/InputForm'
import { useRouter } from 'next/router'
import SyncLoader from 'react-spinners/SyncLoader'
import { css } from '@emotion/react'
import Cookies from 'universal-cookie'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Độ dài tối thiểu 6 ký tự.!')
    .max(15, 'Độ dài tối đa 15 ký tự.!')
    .required('Không được để trống'),
  newPassword: Yup.string()
    .min(6, 'Độ dài tối thiểu 6 ký tự.!')
    .max(15, 'Độ dài tối đa 15 ký tự.!')
    .required('Không được để trống')
    .test('Mật khẩu mới trùng mật khẩu cũ', 'Đã trùng với mật khẩu hiện tại', (value, e) => {
      const { currentPassword } = e.parent
      return currentPassword !== value
    }),
  confirmNewPassword: Yup.string()
    .min(6, 'Độ dài tối thiểu 6 ký tự.!')
    .max(15, 'Độ dài tối đa 15 ký tự.!')
    .required('Không được để trống')
    .test('confirm-password-match', 'Mật khẩu không khớp', (value, e) => {
      const { newPassword } = e.parent
      return newPassword === value
    })
})

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export default function Password () {
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const cookies = new Cookies()
  const router = useRouter()
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    return axios({
      url: '/api/admin/password',
      method: 'PUT',
      data: values
    }).then(res => {
      if (res.data.status === 401) {
        toast.error(res?.data?.msg)
        actions.setSubmitting(false)
      } else {
        toast.success(res?.data?.msg)
        actions.setSubmitting(false)
      }
    }).catch((e) => {
      actions.setSubmitting(false)
    })
  }
  useEffect(() => {
    const user = cookies.get('userInfo')

    const getData = async () => {
      if (user) {
        setData(user)
      }
    }
    getData()
  }, [router])
  return (
    <div className='form-password'>
      <Container className='mb-lg-5 mb-4'>
        <h2 className='text-center my-5 fw-bold us-login__tilte'>Đổi Mật Khẩu</h2>
        <Formik
          initialValues={data}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className='form-pw'>
              <Field
                id='currentPassword'
                name='currentPassword'
                titleLabel='Mật khẩu hiện tại'
                type='password'
                component={InputForm}
                errors={errors.currentPassword}
                touched={touched.currentPassword}
              />
              <Field
                id='newPassword'
                name='newPassword'
                titleLabel='Mật khẩu mới'
                type='password'
                errors={errors.newPassword}
                component={InputForm}
                touched={touched.newPassword}
              />
              <Field
                id='confirmNewPassword'
                name='confirmNewPassword'
                titleLabel='Nhập lại mật khẩu mới'
                title='Confirm Password Is Not Match, Please Try Again'
                type='password'
                errors={errors.confirmNewPassword}
                component={InputForm}
                touched={touched.confirmNewPassword}
              />
              <button className='nc-button' type='submit' disabled={isSubmitting}>
                {
                  isSubmitting ? <SyncLoader color='#4F46E5' loading={isSubmitting} speedMultiplier={0.5} css={override} size={10} /> : 'Cập nhật'
                }
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  )
}
Password.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Đổi mật khẩu'
    }}
    >
      {page}
    </Layout>
  )
}
