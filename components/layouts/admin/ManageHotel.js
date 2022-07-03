import { FiEdit, FiTrash } from 'react-icons/fi'
import React from 'react'

export default function ManageHotel () {
  return (
    <div className='manage-hotels'>
      <div className='container'>
        <div className='text-center title mt-4'>Quản lý khách sạn</div>
        <div className='row'>
          <div className='col-sm-6 col-md-6 d-flex align-items-center manage-hotels__btn'>
            <span>Thêm khách sạn</span>
          </div>
          <div className='col-sm-6 col-md-6 d-flex align-items-center justify-content-end manage-hotels__btn'>
            <span>Danh sách đã xóa</span>
          </div>
        </div>
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
              <tr>
                <td>
                  <button className='btn-edit btn btn-success  btn ' type='button'>Sửa <FiEdit /></button>
                  <button className='btn-delete btn-cancel btn ' type='button'>Xóa <FiTrash /></button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}
