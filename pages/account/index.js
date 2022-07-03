import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layouts/user/Layout'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../components/layouts/user/me/Sidebar'
import BarItem from '../../components/layouts/user/me/BarItem'
import { BiKey } from 'react-icons/bi'
import { CgUserList } from 'react-icons/cg'
import { RiHistoryFill } from 'react-icons/ri'
import Cookies from 'universal-cookie'
import AccountInfo from './account-info'
import BookingHistory from './booking-history'
import ChangePwd from './change-pwd'

export default function Me ({ children, props }) {
  const router = useRouter()
  const [tab, setTab] = useState(0)
  const cookies = new Cookies()
  const token = cookies.get('accessToken')
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  })
  const user = cookies.get('userInfo')

  const getProfileData = async () => {
    if (user) {
      setProfileData({
        ...profileData,
        id: user._id,
        name: user.name,
        email: user.email
      })
    }
  }

  const handleTab = (tab) => {
    window.sessionStorage.setItem('meTab', tab)
    setTab(tab)
  }

  useEffect(() => {
    const curTab = window.sessionStorage.getItem('meTab')
    if (curTab) {
      setTab(parseInt(curTab))
    }
    getProfileData()
  }, [router])
  if (token) {
    return (
      <div className='us-profile'>
        <div className='us-profile__tabs'>
          <div className='border-neutral-200 py-5 bg-white'>
            <Container>
              <Row className='gap-4'>
                <Col xs={2} md={3} className='sidebar d-none d-lg-block flex-grow-1 border border-neutral-200 px-0 p-sm-4'>
                  <div className='display-info text-start avatar-wrapper position-relative align-items-center px-4 py-3 mb-3'>
                    <h3 className='mb-2 user-name'>{profileData.name}</h3>
                    <span>{profileData.email}</span>
                  </div>
                  <Sidebar>
                    <BarItem onClick={() => handleTab(0)} active={tab} item_id={parseInt(0)} leftIcon={<CgUserList />} title='Thông tin tài khoản' />
                    <BarItem onClick={() => handleTab(1)} active={tab} item_id={parseInt(1)} leftIcon={<RiHistoryFill />} title='Lịch sử đặt phòng' />
                    <BarItem onClick={() => handleTab(2)} active={tab} item_id={parseInt(2)} leftIcon={<BiKey />} title='Đổi mật khẩu' />
                  </Sidebar>
                </Col>
                <Col xs={10} md={8} className='me-tab d-none d-lg-block flex-grow-1 border border-neutral-200 px-1 px-sm-5 py-sm-4 ms-1'>
                  {tab === 0 && <AccountInfo />}
                  {tab === 1 && <BookingHistory user={profileData.id} />}
                  {tab === 2 && <ChangePwd />}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='us-profile'>
      <h1 className='text-center my-5 fw-bold'>
        Vui lòng <Link href='/login'><a>đăng nhập</a></Link> trước !!
      </h1>
    </div>
  )
}
Me.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Tài khoản'
    }}
    >
      {page}
    </Layout>
  )
}
