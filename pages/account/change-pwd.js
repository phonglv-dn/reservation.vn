import React, { useState, useEffect } from 'react'
import Me from '.'
import InputForm from '../../components/layouts/user/InputForm'
import Layout from '../../components/layouts/user/Layout'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import axios from '../../network/axios'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự.!')
    .required('Không được để trống'),
  newPassword: Yup.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự.!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Mật khẩu phải có ít nhất 1 chữ cái in hoa, một chữ cái thường và một số !')
    .required('Không được để trống')
    .test('same-current-password', 'Đã trùng với mật khẩu hiện tại', (value, e) => {
      const { currentPassword } = e.parent
      return currentPassword !== value
    }),
  confirmNewPassword: Yup.string()
    .required('Không được để trống')
    .test('confirm-password-match', 'Mật khẩu không khớp', (value, e) => {
      const { newPassword } = e.parent
      return newPassword === value
    })
})

export default function ChangePwd () {
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const cookies = new Cookies()
  const router = useRouter()
  const user = cookies.get('userInfo')

  const getData = async () => {
    if (user) {
      setData(user)
    }
  }
  const handleSubmit = async (values, actions) => {
    // same shape as initial values
    actions.setSubmitting(true)
    return axios({
      url: '/api/auth/password',
      method: 'PUT',
      data: values
    }).then(res => {
      actions.setSubmitting(false)
      toast.success(res?.data?.msg)
    }).catch(err => {
      toast.error(err?.response?.data?.msg)
      actions.setSubmitting(false)
    })
  }
  useEffect(() => {
    getData()
  }, [router])
  return (
    <>
      <h2 className='me-tab__title'>Đổi mật khẩu</h2>
      <Formik
        initialValues={data}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              id='currentPassword'
              name='currentPassword'
              value={data.currentPassword}
              titleLabel='Mật khẩu hiện tại'
              type='password'
              component={InputForm}
              errors={errors.currentPassword}
              touched={touched.currentPassword}
            />
            <Field
              id='newPassword'
              name='newPassword'
              value={data.newPassword}
              titleLabel='Mật khẩu mới'
              type='password'
              errors={errors.newPassword}
              component={InputForm}
              touched={touched.newPassword}
            />
            <Field
              id='confirmNewPassword'
              name='confirmNewPassword'
              value={data.confirmNewPassword}
              titleLabel='Nhập lại mật khẩu mới'
              pattern={data.newPassword}
              title='Mật khẩu nhập lại không trùng khớp, vui lòng thử lại!'
              type='password'
              errors={errors.confirmNewPassword}
              component={InputForm}
              touched={touched.confirmNewPassword}
            />
            <div className='btn-wrapper pt-4 text-end'>
              <button
                type='submit'
                className='us-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5'
                disabled={isSubmitting}
              >
                {
                  isSubmitting ? 'Đang tải...' : 'Cập nhập'
                }
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
ChangePwd.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Me>
        {page}
      </Me>
    </Layout>
  )
}
