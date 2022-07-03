const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('./model')
const auth = require('../../middleware/auth')
const upload = require('../../middleware/imageUpload')

// @route:  POST /api/auth/signup
// @desc:   Đăng ký người dùng mới
router.post('/signup', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body

  if (password.length < 6) {
    return res.status(400).json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    let user = await User.findOne({ email: email.toLowerCase() })
    if (user) {
      return res.status(400).json({ msg: 'Email đã tồn tại' })
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role
    })
    const error = user.validateSync()
    if (error) {
      return res.status(400).json(error.errors)
    }

    // Mã hóa mật khẩu
    user.password = await bcrypt.hash(password, 10)
    await user.save()
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err
      return res.status(201).json({ msg: 'Đăng ký thành công', user, token })
    })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/auth/me
// @desc:   Lấy thông thông người dùng hiện tại
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        msg: 'Không thể tìm thấy user này'
      })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  POST /api/auth
// @desc:   Chức năng đăng nhập
router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (password && password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }

  try {
    // Kiểm tra người dùng đã đăng ký
    const user = await User.findOne({ email: email && email.toLowerCase() }).select(
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
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/auth/me
// @desc:   Cập nhật thông tin người dùng
router.put('/me', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { email } = req.body
    if (email) {
      // Kiểm tra nếu người dùng tồn tại
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
    res.status(200).json({ user, msg: 'Thông tin đã được cập nhật' })
  } catch (error) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/auth/password
// @desc:   Cập nhật mật khẩu
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = await req.body

    const user = await User.findById(req.userId).select('+password')
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }

    // Kiểm tra xem mật khẩu hiện tại có khớp không
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Mật khẩu không đúng' })
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    res.status(200).json({ msg: 'Cập nhật mật khẩu thành công' })
  } catch (error) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

module.exports = router
