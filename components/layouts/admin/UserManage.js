import axios from '../../../network/axios'
import React, { useState, useEffect } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'

export default function UserManage () {
  const [idTarget, setIdTarget] = useState('')
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    _id: ''
  })
  const [users, setUsers] = useState([])
  const [usersDelete, setUsersDelete] = useState([])
  const [open, setOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState('d-none')
  const [trash, setTrash] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [indexOfPage, setIndexOfPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [totalPost, setTotalPost] = useState(0)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const limit = 10
  const handlePopupConfirm = (id) => {
    setIdTarget(id)
    if (openPopup === 'd-none') {
      setOpenPopup('d-flex')
    } else {
      setOpenPopup('d-none')
    }
  }

  const retrieveUsers = async () => {
    const response = await axios({
      url: '/api/manage-users'
    })
    return response.data
  }
  const listDeletedUser = async () => {
    const response = await axios({
      url: '/api/manage-users/trash'
    })
    return response.data
  }
  const getUserData = async (id) => {
    setOpen(true)
    const response = await axios({
      method: 'GET',
      url: `/api/manage-users/${id}`
    })
    const info = response.data.user
    setUserData({
      ...userData,
      name: info.name,
      email: info.email,
      role: info.role,
      id: info._id
    })
  }
  const getUsers = async () => {
    const users = await retrieveUsers()
    if (users) {
      setUsers(users)
      setTotalPost(users.length)
    }
  }
  const getUserDeleted = async () => {
    const usersDelete = await listDeletedUser()
    if (usersDelete) setUsersDelete(usersDelete)
  }
  const handleDelete = async (id) => {
    await axios({
      method: 'DELETE',
      url: `/api/manage-users/${id}`
    })
    getUsers()
    getUserDeleted()
    setOpenPopup('d-none')
    toast.success('Xóa tài khoản thành công !')
  }
  const handleRestore = async (id) => {
    await axios({
      method: 'PUT',
      url: `/api/manage-users/restore/${id}`
    })
    getUserDeleted()
    getUsers()
    setOpenPopup('d-none')
    toast.success('Khôi phục thành công !')
  }
  const handleEdit = async (e, id) => {
    e.preventDefault()
    try {
      const msgDefault = 'Cập nhật thành công'
      const res = await axios({
        method: 'PUT',
        url: `/api/manage-users/${id}`,
        data: {
          name: userData.name,
          role: userData.role
        }
      })
      if (!res.data.msg) {
        return toast.success(msgDefault)
      }
      await getUsers()
      setOpen(false)
      return toast.success(res?.data?.msg)
    } catch (err) {
      toast.error(err.msg)
    }
  }
  const closePopUp = (e) => {
    e.preventDefault()
    setOpen(false)
  }
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1)
    setIndexOfPage(data.selected)
  }
  useEffect(() => {
    getUsers()
    getUserDeleted()
  }, [limit])
  return (
    <div className='user-container container'>
      <div className='text-center title mt-4'>Quản lý Người dùng</div>
      <div className='row'>
        <div className='col-sm-6 col-md-6 d-flex align-items-center list-user-deleted'>
          <span onClick={(() => setTrash(!trash))}>{trash ? 'Danh sách người dùng' : 'Danh sách đã xóa'}</span>
        </div>
      </div>
      {
        !trash &&
          <div className='users-table mt-3'>
            <table id='customers' className='table-bordered'>
              <thead>
                <tr>
                  <th className='sorting'>STT</th>
                  <th className='sorting'>ID</th>
                  <th className='sorting'>Email</th>
                  <th className='sorting'>Tên</th>
                  <th className='sorting'>Vai trò</th>
                  <th className='sorting'>Hành động</th>
                </tr>
              </thead>
              {
                users?.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{((indexOfPage * postsPerPage) + (index + 1))}</td>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.role}</td>
                      <td>
                        <button className='btn-edit btn btn-success  btn ' type='button' onClick={() => getUserData(item._id)}>Sửa <FiEdit /></button>
                        <button className='btn-delete btn-cancel btn ' type='button' onClick={(e) => handlePopupConfirm(item._id)}>Xóa <FiTrash /></button>
                      </td>
                      <div className={`popup-confirm + ${openPopup}`}>
                        <div className='popup-confirm__box'>
                          <h2 className='popup-confirm__title'>Bạn có muốn xóa tài khoản này không?</h2>
                          <div className='popup-confirm__button'>
                            <button className='btn-success btn popup-confirm__button--success' onClick={(e) => handleDelete(idTarget)}>Có</button>
                            <button className='btn-cancel btn popup-confirm__button--cancel' onClick={() => setOpenPopup('d-none')}>Không</button>
                          </div>
                        </div>
                      </div>
                    </tr>
                  )
                })
              }
            </table>
          </div>
      }
      {
        trash &&
          <div className='users-table mt-3'>
            <table id='customers' className='table-bordered'>
              <thead>
                <tr>
                  <th className='sorting'>STT</th>
                  <th className='sorting'>ID</th>
                  <th className='sorting'>Email</th>
                  <th className='sorting'>Tên</th>
                  <th className='sorting'>Vai trò</th>
                  <th className='sorting'>Hành động</th>
                </tr>
              </thead>
              {
                usersDelete?.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{((indexOfPage * postsPerPage) + (index + 1))}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.role}</td>
                      <td>
                        <button className='btn-edit btn btn-success  btn ' type='button' onClick={(e) => handlePopupConfirm(item.id)}>Khôi Phục <FiEdit /></button>
                      </td>
                      <div className={`popup-confirm + ${openPopup}`}>
                        <div className='popup-confirm__box'>
                          <h2 className='popup-confirm__title'>Bạn có muốn khôi phục tài khoản này không?</h2>
                          <div className='popup-confirm__button'>
                            <button className='btn-success btn popup-confirm__button--success' onClick={(e) => handleRestore(idTarget)}>Có</button>
                            <button className='btn-cancel btn popup-confirm__button--cancel' onClick={() => setOpenPopup('d-none')}>Không</button>
                          </div>
                        </div>
                      </div>
                    </tr>
                  )
                })
              }
            </table>
          </div>
      }
      {
        open &&
          <div className='modal-edit' id='myForm'>
            <div className='modal-container'>
              <form onSubmit={(e) => handleEdit(e, userData.id)} className='form-container-popup-edit'>
                <h1 className='title-update-popup mb-4'>Cập Nhật Người Dùng</h1>
                <div className='pb-2'>
                  <label htmlFor='name'><b>Tên</b></label>
                  <input
                    className='us-edit__input'
                    type='text'
                    placeholder={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    name='name'
                  />
                </div>
                <div className='pb-2'>
                  <label htmlFor='psw'><b>Email</b></label>
                  <input
                    className='us-edit__input'
                    type='email'
                    placeholder={userData.email}
                    name='psw'
                    disabled
                    readOnly
                  />
                </div>
                <div className='pt-2'>
                  <label htmlFor='role'>Vai trò</label>
                  <select className='checkRole ms-3' onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
                    <option value='admin' selected={userData.role === 'admin'}>Admin</option>
                    <option value='user' selected={userData.role === 'user'}>User</option>
                  </select>
                </div>
                <div className='btn-popup-update'>
                  <button type='submit' className='btn btn-success btn-popup-update-success'>Lưu</button>
                  <button type='button' className='btn btn-cancel' onClick={(e) => closePopUp(e)}>Đóng</button>
                </div>
              </form>
            </div>
          </div>
      }
      <ReactPaginate
        previousLabel='Trước'
        nextLabel='Sau'
        breakLabel='...'
        pageCount={(totalPost - 1) / postsPerPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        activeClassName='active'
      />
    </div>
  )
}
