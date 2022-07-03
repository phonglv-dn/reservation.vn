const express = require('express')
const router = express.Router()

const Room = require('./model')

// @route: POST /api/rooms/add
// @desc: Thêm phòng mới
router.post('/add', async (req, res) => {
  const { name, price, amount, hotelID, capacity = 'room' } = req.body

  try {
    let room = await Room.findOne({ name, hotelID })
    if (room) {
      return res.status(400).json({ msg: 'Phòng đã tồn tại' })
    }

    room = new Room({
      name,
      price,
      amount,
      hotelID,
      capacity
    })
    const error = room.validateSync()
    if (error) {
      return res.status(400).json(error.errors)
    }

    await room.save()
    return res.status(201).json({ msg: 'Thêm phòng thành công', room })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống', err })
  }
})

// @route:  GET /api/hotels/rooms/list
// @desc:   Lấy danh sách phòng của khách sạn
router.post('/list', async (req, res) => {
  const { hotelID } = req.body
  try {
    const rooms = await Room.find({ hotelID })
    if (rooms.length > 0) {
      return res.status(200).json({ rooms })
    } else {
      return res.status(200).json({ rooms: [], msg: 'Không có phòng nào được tìm thấy' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/hotels/rooms/all-rooms
// @desc:   Lấy danh sách tất cả phòng trong hệ thống
router.get('/all-rooms', async (req, res) => {
  try {
    const rooms = await Room.find()
    if (rooms.length > 0) {
      return res.status(200).json({ rooms })
    } else {
      return res.status(200).json({ rooms: [], msg: 'Không có phòng nào được tìm thấy' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/rooms/trash
// @desc:   Lấy danh sách các phòng bị xóa tạm thời
router.get('/trash', async (req, res) => {
  try {
    const rooms = await Room.find({ isDeleted: true })
    if (rooms.length > 0) {
      return res.status(200).json({ rooms })
    } else {
      return res.status(200).json({ rooms: [], msg: 'Không có phòng nào bị xóa' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/rooms/:id
// @desc:   Cập nhật thông tin phòng
router.put('/:id', async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Không tìm thấy phòng' })
    }
    const updatedRoom = {
      ...req.body
    }

    room = await Room.findByIdAndUpdate(req.params.id, updatedRoom, { new: true })

    return res.status(200).json({ msg: 'Cập nhật phòng thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/rooms/:id
// @desc:   Xóa vĩnh viễn phòng
router.delete('/:id', async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    room = await Room.findOneAndDelete(req.params.id)
    return res.status(200).json({ msg: 'Xóa khách sạn vĩnh viễn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/rooms/:id
// @desc:   Xóa tạm thời phòng
router.put('/del/:id', async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    if (room.isDeleted === true) {
      return res.status(400).json({ msg: 'Khách sạn đã bị xóa' })
    }
    const updateDelete = {
      isDeleted: true
    }
    room = await Room.findByIdAndUpdate(req.params.id, updateDelete, { new: true })
    return res.status(200).json({ msg: 'Xóa khách sạn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/rooms/trash/:id
// @desc:   Khôi phục phòng
router.put('/trash/:id', async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    if (room.isDeleted === false) {
      return res.status(400).json({ msg: 'Khách sạn chưa bị xóa' })
    }
    const updateRestore = {
      isDeleted: false
    }
    room = await Room.findByIdAndUpdate(req.params.id, updateRestore, { new: true })
    return res.status(200).json({ msg: 'Khôi phục khách sạn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/rooms/:id
// @desc:   Lấy thông tin phòng
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Không tìm thấy phòng này' })
    }
    return res.status(200).json({ room })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

module.exports = router
