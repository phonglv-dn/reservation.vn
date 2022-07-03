import React from 'react'
import { FaUserEdit, FaHotel } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function LeftSidebar () {
  return (
    <div className='left side-menu'>
      <div className='topbar-left'>
        <div>
          <a className='logo' href='/'>
            <Image src='/images/logos/logos_white.png' width={200} height={33} />
          </a>
        </div>
      </div>
      <div className='sidebar-inner slimscrollleft'>
        <div id='sidebar-menu'>
          <ul>
            <Link href='/admin/manage-users'>
              <li className='has_sub active nav-active'>
                <a>
                  <i><FaUserEdit className='' /></i>
                  <span>Quản Lý Người Dùng</span>
                </a>
              </li>
            </Link>
            <Link href='/admin/manage-hotels'>
              <li className='has_sub active nav-active'>
                <a>
                  <i><FaHotel className='' /></i>
                  <span>Quản Lý Khách Sạn</span>
                </a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
