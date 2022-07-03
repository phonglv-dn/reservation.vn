import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import onClickOutside from 'react-onclickoutside'
// import axios from '../../../network/axios'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { FiHome, FiCalendar } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { HiOutlineCash, HiOutlineUserCircle, HiOutlineSearch } from 'react-icons/hi'
import { MdLanguage, MdOutlineBookmarkAdded, MdOutlineMessage, MdOutlineHelpOutline, MdOutlineLogout } from 'react-icons/md'
import Cookies from 'universal-cookie'

const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside
}

export function Header () {
  const [dropdown, setDropdown] = useState(0)
  const [open, setOpen] = useState(false)
  Header.handleClickOutside = () => {
    setDropdown(0)
  }
  const router = useRouter()
  const cookies = new Cookies()
  const token = cookies.get('accessToken')
  const [profileData, setProfileData] = useState({
    profilePicUrl: ''
  })

  const user = cookies.get('userInfo')
  const getProfileData = async () => {
    if (user) {
      setProfileData(user)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [router])

  const handleDropdown = (tab) => {
    setDropdown((prev) => {
      if (prev === tab) {
        return 0
      } else {
        return tab
      }
    })
  }

  const goToBH = () => {
    setDropdown(0)
    window.sessionStorage.setItem('meTab', 1)
  }

  const handleLogout = () => {
    cookies.remove('accessToken')
    cookies.remove('userInfo')
    router.push('/login')
    setOpen(!open)
  }
  return (
    <div className='us-header sticky-top sticky-lg-top w-100'>
      <div className='us-header__nav position-relative'>
        <Container className='py-4 position-relative d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-start flex-grow-1 align-items-center h-100'>
            <Link href='/'>
              <a className='ttnc-logo d-inline-block'>
                Reservation.vn
              </a>
            </Link>
            <div className='vertical-bar d-none d-sm-block mx-sm-8 mx-lg-10 mx-3' />
            <div className='d-sm-block d-none'>
              <div className='DropdownTravelers'>
                <div className='position-relative'>
                  <button onClick={(() => handleDropdown(1))} className='btn-dropdown py-2 rounded-2 fs-6 lh-base'>
                    <div className='btn-dropdown__wrap d-none d-sm-inline-flex align-items-center '>
                      <span className='fw-bold'>Du khách</span>
                      <GoChevronDown className='ms-2 h-25 w-5' />
                    </div>
                  </button>
                  <div className={`${dropdown === 1 ? 'show' : 'hide'} dropdown position-absolute vw-100 mw-50 px-4 px-sm-0 mt-3`}>
                    <div className='dropdown__contents overflow-hidden shadow-sm'>
                      <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                        <Link href='/hotels'>
                          <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                            <div className='item-icon item-icon-travelers d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                              <FiHome />
                            </div>
                            <div className='item-contents ms-3'>
                              <p className='lh-sm item-contents__title'>Chỗ ở</p>
                              <p className='sub'>Mô tả cho các nơi thuê lưu trú </p>
                            </div>
                          </a>
                        </Link>
                        <Link href='/blogs'>
                          <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                            <div className='item-icon item-icon-travelers d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                              <FiCalendar />
                            </div>
                            <div className='item-contents ms-3'>
                              <p className='lh-sm item-contents__title'>Kinh nghiệm</p>
                              <p className='sub'>Tour và những kinh nghiệm </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className='documentation p-4'>
                        <a>
                          <span className='d-flex align-items-center'>
                            <span className='text-sm font-medium '>Tài liệu</span>
                          </span>
                          <span className='sub d-block text-sm'>Bắt đầu tích hợp các sản phẩm và công cụ</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-shrink-0 flex align-items-center justify-content-end'>
            <div className='d-none align-items-center d-xl-flex'>
              <div className='CurrencyDropdown'>
                <div className='position-relative'>
                  <button onClick={(() => handleDropdown(2))} className='btn-dropdown py-2 rounded-2 fs-6 lh-base text-sm font-semibold'>
                    <div className='btn-dropdown__wrap d-none d-sm-inline-flex align-items-center '>
                      <HiOutlineCash className='iconSw' />
                      <span className='ms-2'>Tiền tệ</span>
                      <GoChevronUp className='d-none ms-2 h-25 w-5' />
                      <GoChevronDown className='ms-2 h-25 w-5' />
                    </div>
                  </button>
                  <div className={`${dropdown === 2 ? 'show' : 'hide'} currency dropdown position-absolute vw-100 px-4 px-sm-0 mt-1`}>
                    <div className='dropdown__contents overflow-hidden shadow-sm'>
                      <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                        <a href='#' className='d-flex align-items-center p-2'>
                          <div className='item-contents ms-3'>
                            <p onClick={(() => setDropdown(0))} className='lh-sm item-contents__title'>EUR</p>
                          </div>
                        </a>
                        <a href='#' className='d-flex align-items-center p-2'>
                          <div className='item-contents ms-3'>
                            <p onClick={(() => setDropdown(0))} className='lh-sm item-contents__title'>VND</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='LangDropdown'>
                <div className='position-relative'>
                  <button onClick={(() => handleDropdown(3))} className='btn-dropdown py-2 rounded-2 fs-6 lh-base text-sm font-semibold'>
                    <div className='btn-dropdown__wrap d-none d-sm-inline-flex align-items-center'>
                      <MdLanguage className='iconSw' />
                      <span className='ms-2'>Ngôn ngữ</span>
                      <GoChevronUp className='d-none ms-2 h-25 w-5' />
                      <GoChevronDown className='ms-2 h-25 w-5' />
                    </div>
                  </button>
                  <div className={`${dropdown === 3 ? 'show' : 'hide'} language dropdown position-absolute vw-100 px-4 px-sm-0 mt-1`}>
                    <div className='dropdown__contents overflow-hidden shadow-sm'>
                      <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                        <a href='#' onClick={(() => setDropdown(0))} className='d-flex align-items-center p-2'>
                          <div className='item-contents ms-1'>
                            <p className='lh-sm item-contents__title'>Tiếng Việt</p>
                          </div>
                        </a>
                        <a href='#' onClick={(() => setDropdown(0))} className='d-flex align-items-center p-2'>
                          <div className='item-contents ms-1'>
                            <p className='lh-sm item-contents__title'>Tiếng Anh</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='notification mx-1'>
                <div className='position-relative'>
                  <button className='p-2 rounded-pill d-inline-flex align-items-center text-base font-medium position-relative'>
                    <HiOutlineSearch className='iconNotify' />
                  </button>
                </div>
              </div>
              {
                user &&
                  <div className='AvatarDropdown'>
                    <div className='position-relative'>
                      <button onClick={() => handleDropdown(4)} className='btn-dropdown d-inline-flex align-items-center'>
                        <div className='header-avatar position-relative flex-shrink-0 d-inline-flex align-items-center justify-content-center text-uppercase rounded-circle'>
                          {token ? <img className='position-absolute rounded-circle w-100 h-100' src={profileData.profilePicUrl} alt='My Account' /> : <HiOutlineUserCircle fontSize={26} />}
                        </div>
                      </button>
                      <div className={(dropdown === 4 ? 'show' : 'hide') + ' avatar dropdown position-absolute z-10 vw-100 px-4 mt-3 -right-10 end-0 px-sm-0'}>
                        <div className='dropdown__contents overflow-hidden shadow-sm'>
                          <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                            <Link href='/account'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                  <HiOutlineUserCircle />
                                </div>
                                <div className='item-contents ms-3'>
                                  <p className='lh-sm item-contents__title'>Tài khoản</p>
                                </div>
                              </a>
                            </Link>
                            <Link href='/account'>
                              <a onClick={() => goToBH()} className='d-flex align-items-center p-2'>
                                <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                  <MdOutlineBookmarkAdded />
                                </div>
                                <div className='item-contents ms-3'>
                                  <p className='lh-sm item-contents__title'>Booking</p>
                                </div>
                              </a>
                            </Link>
                            <a href='#' onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                              <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                <MdOutlineHelpOutline />
                              </div>
                              <div className='item-contents ms-3'>
                                <p className='lh-sm item-contents__title'>Trợ giúp</p>
                              </div>
                            </a>
                            <a href='#' onClick={() => { setDropdown(0); handleLogout() }} className='d-flex align-items-center p-2'>
                              <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                <MdOutlineLogout />
                              </div>
                              <div className='item-contents ms-3'>
                                <p className='lh-sm item-contents__title'>Đăng xuất</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              {
                !user &&
                  <div className='AvatarDropdown'>
                    <div className='position-relative'>
                      <button onClick={() => handleDropdown(4)} className='btn-dropdown d-inline-flex align-items-center'>
                        <div className='header-avatar position-relative flex-shrink-0 d-inline-flex align-items-center justify-content-center text-uppercase rounded-circle'>
                          {token ? <img className='position-absolute rounded-circle w-100 h-100' src={profileData.profilePicUrl} alt='My Account' /> : <HiOutlineUserCircle fontSize={26} />}
                        </div>
                      </button>
                      <div className={(dropdown === 4 ? 'show' : 'hide') + ' avatar dropdown position-absolute z-10 vw-100 px-4 mt-3 -right-10 end-0 px-sm-0'}>
                        <div className='dropdown__contents overflow-hidden shadow-sm'>
                          <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                            <Link href='/login'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-contents'>
                                  <p className='lh-sm item-contents__title'>Đăng nhập</p>
                                </div>
                              </a>
                            </Link>
                            <Link href='/signup'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-contents'>
                                  <p className='lh-sm item-contents__title'>Đăng ký</p>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    }
            </div>
            <div className='d-flex items-center space-x-4 d-xl-none'>
              <div className='notification mx-1'>
                <div className='position-relative'>
                  <button className='p-2 rounded-pill d-inline-flex align-items-center text-base font-medium position-relative'>
                    <span className='position-absolute top-0 start-100 badge border border-light rounded-circle bg-danger p-1'><span className='visually-hidden'>unread messages</span></span>
                    <IoNotificationsOutline className='iconNotify' />
                  </button>
                </div>
              </div>
              {
                user &&
                  <div className='AvatarDropdown'>
                    <div className='position-relative'>
                      <button onClick={() => handleDropdown(4)} className='btn-dropdown d-inline-flex align-items-center'>
                        <div className='header-avatar position-relative flex-shrink-0 d-inline-flex align-items-center justify-content-center text-uppercase rounded-circle'>
                          {token ? <img className='position-absolute rounded-circle w-100 h-100' src={profileData.profilePicUrl} alt='My Account' /> : <HiOutlineUserCircle fontSize={26} />}
                        </div>
                      </button>
                      <div className={(dropdown === 4 ? 'show' : 'hide') + ' avatar dropdown position-absolute z-10 vw-100 px-4 mt-3 -right-10 end-0 px-sm-0'}>
                        <div className='dropdown__contents overflow-hidden shadow-sm'>
                          <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                            <Link href='/account'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                  <HiOutlineUserCircle />
                                </div>
                                <div className='item-contents ms-3'>
                                  <p className='lh-sm item-contents__title'>Tài khoản</p>
                                </div>
                              </a>
                            </Link>
                            <a href='#' onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                              <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                <MdOutlineBookmarkAdded />
                              </div>
                              <div className='item-contents ms-3'>
                                <p className='lh-sm item-contents__title'>Booking</p>
                              </div>
                            </a>
                            <a href='#' onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                              <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                <HiOutlineUserCircle />
                              </div>
                              <div className='item-contents ms-3'>
                                <p className='lh-sm item-contents__title'>Trợ giúp</p>
                              </div>
                            </a>
                            <a href='#' onClick={() => { setDropdown(0); handleLogout() }} className='d-flex align-items-center p-2'>
                              <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                <MdOutlineMessage />
                              </div>
                              <div className='item-contents ms-3'>
                                <p className='lh-sm item-contents__title'>Đăng xuất</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              {
                !user &&
                  <div className='AvatarDropdown'>
                    <div className='position-relative'>
                      <button onClick={() => handleDropdown(4)} className='btn-dropdown d-inline-flex align-items-center'>
                        <div className='header-avatar position-relative flex-shrink-0 d-inline-flex align-items-center justify-content-center text-uppercase rounded-circle'>
                          {token ? <img className='position-absolute rounded-circle w-100 h-100' src={profileData.profilePicUrl} alt='My Account' /> : <HiOutlineUserCircle fontSize={26} />}
                        </div>
                      </button>
                      <div className={(dropdown === 4 ? 'show' : 'hide') + ' avatar dropdown position-absolute z-10 vw-100 px-4 mt-3 -right-10 end-0 px-sm-0'}>
                        <div className='dropdown__contents overflow-hidden shadow-sm'>
                          <div className='dropdown__contents--items position-relative d-grid grid-cols-1 gap-4 bg-white p-4 '>
                            <Link href='/login'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                  <HiOutlineUserCircle />
                                </div>
                                <div className='item-contents ms-3'>
                                  <p className='lh-sm item-contents__title'>Đăng nhập</p>
                                </div>
                              </a>
                            </Link>
                            <Link href='/signup'>
                              <a onClick={() => setDropdown(0)} className='d-flex align-items-center p-2'>
                                <div className='item-icon d-flex align-items-center justify-content-center flex-shrink-0 rounded-3'>
                                  <HiOutlineUserCircle />
                                </div>
                                <div className='item-contents ms-3'>
                                  <p className='lh-sm item-contents__title'>Đăng ký</p>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    }
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
export default onClickOutside(Header, clickOutsideConfig)
