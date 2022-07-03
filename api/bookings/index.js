const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router()
const auth = require('../../middleware/auth')
const Booking = require('./model')
const Room = require('../rooms/model')
const User = require('../auth/model')

router.route('/').post(auth, async (req, res, next) => {
  // @route:  POST /api/bookings
  // @desc:   Tạo đơn mới
  const { cityId, hotelId, roomId, checkinDate, userName, email, phone, totalPrice } = req.body
  const room = await Room.findOne({ _id: Mongoose.Types.ObjectId(roomId) }).lean()
  const booked = await Booking.find({ roomId: Mongoose.Types.ObjectId(roomId), checkinDate, isCancel: false }).lean()
  const available = room.amount - booked.length
  if (available === 0) {
    return res.status(400).json({ msg: 'Hết phòng', available })
  }
  const userId = req.userId
  try {
    const booking = new Booking({
      cityId,
      hotelId,
      roomId,
      userId,
      checkinDate,
      userName,
      email,
      phone,
      totalPrice,
      isCancel: false
    })
    await booking.save()
    res.status(200).json({
      msg: 'Đặt phòng thành công',
      userId,
      booking
    })
  } catch (e) {
    res.status(500).json({ msg: 'Lỗi hệ thống', e })
  }
}).put(auth, async (req, res) => {
// @route:  PUT /api/bookings
// @desc:   Cập nhật đơn hàng
  const { bookingId } = req.body
  const booking = await Booking.findByIdAndUpdate(Mongoose.Types.ObjectId(bookingId), { checking: true }).lean()
  if (!booking) {
    return res.status(404).json({ msg: 'Không tìm thấy đơn hàng' })
  }
  try {
    if (booking.checking) {
      return res.status(200).json({ msg: 'Đã cập nhật hóa đơn' })
    }
  } catch (e) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

router.route('/check').post(async (req, res, next) => {
  // @route:  POST /api/bookings/check
  // @desc:   Kiểm tra tình trạng phòng
  const { roomId, checkinDate } = req.body
  const room = await Room.findOne({ _id: Mongoose.Types.ObjectId(roomId) }).lean()
  const booked = await Booking.find({ roomId: Mongoose.Types.ObjectId(roomId), checkinDate, isCancel: false }).lean()
  const available = room.amount - booked.length
  if (available === 0) {
    return res.status(400).json({ msg: 'Hết phòng', available })
  }
  return res.status(200).json({ msg: 'Còn phòng, bạn có muốn tiến hành đặt phòng ?', available })
})

router.route('/all-of/:userId').get(auth, async (req, res, next) => {
  // @route:  GET /api/bookings/all-of-user
  // @desc:   Lấy thông tin các đơn đã đặt của người dùng
  const { userId } = req.params
  try {
    const user = await User.findById({ _id: Mongoose.Types.ObjectId(userId) }).lean()
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    } else {
      const booking = await Booking.aggregate([
        {
          $match: { userId: Mongoose.Types.ObjectId(userId) }
        },
        {
          $sort: { _id: -1 }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'rooms',
            localField: 'roomId',
            foreignField: '_id',
            as: 'room'
          }
        },
        {
          $lookup: {
            from: 'hotels',
            localField: 'hotelId',
            foreignField: '_id',
            as: 'hotel'
          }
        },
        {
          $project: {
            hotel: {
              name: 1,
              address: 1,
              typeStay: 1
            },
            room: 1,
            user: {
              profilePicUrl: 1,
              name: 1,
              phone: 1
            },
            checkinDate: 1,
            checking: 1,
            createdAt: 1,
            totalPrice: 1
          }
        }
      ])
      if (booking.length > 0) {
        return res.status(200).json({ msg: 'Lấy danh sách đơn hàng thành công', booking })
      }
      return res.status(200).json({ msg: 'Chưa có đơn hàng nào được tạo', booking })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

router.route('/:id').get(auth, async (req, res, next) => {
// @route:  GET /api/bookings/:id
  // @desc:   Lấy thông tin đơn hàng cụ thể
  const { id } = req.params
  const booking = await Booking.aggregate([
    {
      $match: { _id: Mongoose.Types.ObjectId(id) }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'rooms',
        localField: 'roomId',
        foreignField: '_id',
        as: 'room'
      }
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'hotelId',
        foreignField: '_id',
        as: 'hotel'
      }
    },
    {
      $project: {
        hotel: {
          _id: 1,
          hotelPicsUrl: 1,
          name: 1,
          address: 1,
          typeStay: 1
        },
        room: 1,
        user: {
          profilePicUrl: 1,
          name: 1,
          phone: 1
        },
        userName: 1,
        email: 1,
        phone: 1,
        checkinDate: 1,
        checking: 1,
        createdAt: 1,
        totalPrice: 1
      }
    }
  ])
  if (booking.length > 0) {
    return res.status(200).json({ msg: 'Lấy thông tin đơn hàng thành công', booking })
  }
  return res.status(404).json({ msg: 'Không tìm thấy đơn hàng' })
})

module.exports = router
