const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../auth/model')
const auth = require('../../middleware/auth')
const upload = require('../../middleware/imageUpload')

// @route:  GET /api/admin/me
// @desc:   Lấy thông tin admin hiện tại
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)

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
// @route:  POST /api/admin/
// @desc:   Đăng nhập admin
router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (password && password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }

  try {
    // Kiểm tra tài khoản đã tồn tại
    const user = await User.findOne({ email: email && email.toLowerCase(), role: 'admin' }).select(
      '+password'
    )

    if (!user) {
      return res.status(400).json({ msg: 'Email không tồn tại' })
    }

    // Kiểm tra mật khẩu
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: 'Mật khẩu không đúng' })
    }

    // Đăng nhập bằng JWT và trả về token
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err
      return res.status(200).json({ token })
    })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/admin/me
// @desc:   Cập nhật thông tin
router.put('/me', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { email } = req.body
    if (email) {
      // Kiểm tra email tồn tại
      const matchUser = await User.findOne({ email: email.toLowerCase() })
      if (matchUser && matchUser._id.toString() !== req.userId) {
        return res.status(400).json({ msg: 'Email đã được sử dụng' })
      }
    }
    const updatedUser = {
      ...req.body
    }
    if (req.file && req.file.path) updatedUser.profilePicUrl = req.file.path

    const user = await User.findByIdAndUpdate(req.userId, updatedUser, { new: true })
    return res.status(200).json({ user, msg: 'Thông tin đã được cập nhật' })
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/admin/password
// @desc:   Cập nhật mật khẩu
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
    }
    const user = await User.findById(req.userId).select('+password')
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }

    // Kiểm tra xem mật khẩu hiện tại có khớp không
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Mật khẩu không đúng' })
    }

    // Mã hóa mật khẩu
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    return res.status(200).json({ msg: 'Mật khẩu được cập nhật' })
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

module.exports = router
