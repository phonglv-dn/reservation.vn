import React, { useEffect, useState } from 'react'
import InputForm from '../../components/layouts/user/InputForm'
import Cookies from 'universal-cookie'
import axios from '../../network/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Me from '.'
import Layout from '../../components/layouts/user/Layout'
import SyncLoader from 'react-spinners/SyncLoader'
import ChangeAvt from './change-avt'
import { css } from '@emotion/react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Độ dài tên quá ngắn.!')
    .max(30, 'Độ dài tên quá dài.!')
    .required('Không được để trống'),
  email: Yup.string()
    .lowercase()
    .email(''),
  phone: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại quá ngắn')
})

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export default function AccountInfo () {
  const cookies = new Cookies()
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [enalbeEdit, setEnalbeEdit] = useState(false)
  const user = cookies.get('userInfo')

  const getProfileData = async () => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone
      })
    }
  }
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const res = await axios({
        url: '/api/auth/me',
        method: 'PUT',
        data: values
      })
      actions.setSubmitting(false)
      setEnalbeEdit(false)
      setProfileData({
        ...res.data.user
      })
      cookies.set('userInfo', res?.data?.user, { path: '/' })
      toast.success(res?.data?.msg)
    } catch (e) {
      actions.setSubmitting(false)
    }
  }
  useEffect(() => {
    getProfileData()
  }, [router])
  return (
    <>
      <h2 className='me-tab__title'>Thông tin tài khoản</h2>
      <div className='d-grid gap-4 my-4'>
        <div className='row'>
          <div className='col-4'>
            <ChangeAvt />
          </div>
          <div className='col-8'>
            {
                !enalbeEdit &&
                  <Formik
                    initialValues={profileData}
                    validationSchema={schema}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <Field
                          id='name'
                          name='name'
                          titleLabel='Tên'
                          type='text'
                          component={InputForm}
                          errors={errors.name}
                          touched={touched.name}
                          value={profileData.name}
                          disabled='disabled'
                          readOnly='readOnly'
                        />
                        <Field
                          id='email'
                          name='email'
                          titleLabel='Email'
                          type='email'
                          value={profileData.email}
                          errors={errors.email}
                          component={InputForm}
                          touched={touched.email}
                          disabled='disabled'
                          readOnly='readOnly'
                        />
                        <Field
                          id='phone'
                          name='phone'
                          titleLabel='Số diện thoại'
                          type='text'
                          value={profileData.phone}
                          errors={errors.phone}
                          component={InputForm}
                          touched={touched.phone}
                          disabled='disabled'
                          readOnly='readOnly'
                        />
                        <div className='btn-wrapper pt-4 text-end'>
                          <button onClick={() => setEnalbeEdit(true)} className='us-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5'>
                            Sửa
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
            }
            {
              enalbeEdit &&
                <Formik
                  initialValues={profileData}
                  validationSchema={schema}
                  enableReinitialize
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <Field
                        id='name'
                        name='name'
                        titleLabel='Tên'
                        type='text'
                        component={InputForm}
                        errors={errors.name}
                        touched={touched.name}
                        placeholder={profileData.name}
                      />
                      <Field
                        id='phone'
                        name='phone'
                        titleLabel='Số điện thoại'
                        type='text'
                        component={InputForm}
                        errors={errors.phone}
                        touched={touched.phone}
                        placeholder={profileData.phone}
                      />
                      <div className='btn-wrapper pt-4 text-end'>
                        <button type='submit' className='us-button position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5' disabled={isSubmitting}>
                          {
                            isSubmitting ? <SyncLoader color='#4F46E5' loading={isSubmitting} speedMultiplier={0.5} css={override} size={10} /> : 'Cập nhập'
                          }
                        </button>
                        <button onClick={() => setEnalbeEdit(false)} className='us-button-cancel position-relative h-auto d-inline-flex align-items-center justify-content-center rounded-pill text-sm font-medium px-4 py-3 px-sm-5 ms-2'>
                          Hủy
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
            }
          </div>
        </div>
      </div>
    </>
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
