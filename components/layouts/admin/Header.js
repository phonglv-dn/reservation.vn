import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { BsFillKeyFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function Header () {
  const [data, setData] = useState({
    profilePicUrl: '',
    name: ''
  })
  const [title, setTitle] = useState(null)
  const cookies = new Cookies()
  const router = useRouter()
  const user = cookies.get('userInfo')
  const titlePage = () => {
    const pageUrl = router.pathname
    if (pageUrl === '/admin/profile') {
      setTitle('Hồ sơ cá nhân')
    } else if (pageUrl === '/admin/manage-users') {
      setTitle('Quản lý người dùng')
    } else if (pageUrl === '/admin/password') {
      setTitle('Đổi mật khẩu')
    } else if (pageUrl === '/admin/manage-hotels') {
      setTitle('Quản lý khách sạn')
    } else {
      setTitle('ADMIN')
    }
  }
  const getData = async () => {
    if (user) {
      setData(user)
    }
  }
  useEffect(() => {
    titlePage()
    getData()
  }, [router])

  const handleLogout = () => {
    cookies.remove('accessToken', { path: '/' })
    cookies.remove('userInfo', { path: '/' })
    return router.push('/admin/login')
  }

  return (
    <div className='content-page'>
      <div className='content'>
        <div className='headerad-topbar'>
          <ul>
            <li className='hide-phone list-inline-item app-search'>
              <h2 className='page-title'>{title}</h2>
            </li>
          </ul>
          <ul className='list-inline mb-0 navbar-admin'>
            <li className='avatar-header-li'>
              <Link href='/'>
                <a className=''>
                  <img src={data.profilePicUrl} className='img-circle' alt='user-img' width={36} height={36} />
                </a>
              </Link>
              <ul className='subnav-avatarad'>
                <li><a href='/admin/profile'><FaUserAlt className='sub-icon' />Hồ sơ</a></li>
                <li><a href='/admin/password'><BsFillKeyFill className='sub-icon' />Đổi mật khẩu</a></li>
                <div className='dropdown-divider' />
                <li onClick={() => handleLogout()}><a href='#'><AiOutlineLogout className='sub-icon' />Đăng xuất</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
