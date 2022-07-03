const express = require('express')
const router = express.Router()
const User = require('../auth/model')

// @route:  GET /api/manage-user/all
// @desc:   Lấy danh sách tất cả người dùng
router.get('/all', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
    if (users.length > 0) {
      return res.status(200).json({ users })
    }
    return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/manage-user/
// @desc:   Lấy danh sách tất cả người dùng hiện tại
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
    res.send(users)
    if (users.length > 0) {
      return res.status(200).json({ users })
    }
    return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/manage-user/trash
// @desc:   Lấy danh sách những người dùng đã xóa tạm thời
router.get('/trash', async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true })
    res.send(users)
    if (users.length > 0) {
      return res.status(200).json({ users })
    }
    return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/manage-users/:id
// @desc:   Lấy thông tin người dùng
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        msg: 'Không thể tìm thấy user này'
      })
    }
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/manage-user/:id
// @desc:   Xóa tạm thời người dùng
router.delete('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }
    if (user.isDeleted === true) {
      return res.status(400).json({ msg: 'Người dùng đã bị xóa' })
    }
    const updateDelete = {
      isDeleted: true
    }

    user = await User.findByIdAndUpdate(req.params.id, updateDelete, { new: true })

    return res.status(200).json({ msg: 'Người dùng đã bị xóa' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/manage-user/:id
// @desc:   Cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Người dùng không được tìm thấy' })
    }
    const updatedUser = {
      ...req.body
    }

    user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })

    return res.status(200).json({ msg: 'Người dùng đã được cập nhật' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/manage-user/restore/:id
// @desc:   Khôi phục người dùng
router.put('/restore/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Người dùng không được tìm thấy' })
    }
    if (user.isDeleted === false) {
      return res.status(400).json({ msg: 'Người dùng đã khôi phục' })
    }
    const updateDelete = {
      isDeleted: false
    }

    user = await User.findByIdAndUpdate(req.params.id, updateDelete, { new: false })

    return res.status(200).json({ msg: 'Người dùng đã được khôi phục' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})
module.exports = router
