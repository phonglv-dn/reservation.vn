const express = require('express')
const router = express.Router()

const Hotel = require('./model')
const City = require('../cities/model')
const Rooms = require('../rooms/model')
// @route: POST /api/hotels/add-hotel
// @desc: Thêm khách sạn mới
router.post('/add-hotel', async (req, res) => {
  const { name, hotelPicsUrl, ratingStar, address, cityID, description = 'hotel' } = req.body
  const getSlug = (string) => {
    return string
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      .replace(/Đ/g, 'D')
      .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
      .replace(/\u02C6|\u0306|\u031B/g, '')
      .replace(/[/\\^$*+?.():|[\]{},']/gi, '')
      .replace(/ /gi, '-')
      .toLowerCase()
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/g, '')
      .replace(/-+$/g, '')
      .replace(/ + /g, ' ')
      .trim()
  }

  try {
    let hotel = await Hotel.findOne({ slug: getSlug(name) })
    if (hotel) {
      return res.status(400).json({ msg: 'Khách sạn đã tồn tại' })
    }

    hotel = new Hotel({
      name,
      slug: getSlug(name),
      hotelPicsUrl,
      ratingStar,
      address,
      cityID,
      description
    })
    const error = hotel.validateSync()
    if (error) {
      return res.status(400).json(error.errors)
    }

    await hotel.save()
    return res.status(201).json({ msg: 'Thêm khách sạn thành công', hotel })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống', err })
  }
})

// @route:  GET /api/hotels/all-hotels
// @desc:   Lấy danh sách tất cả khách sạn
router.get('/all-hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find()
    if (hotels.length > 0) {
      return res.status(200).json({ hotels })
    } else {
      return res.status(200).json({ hotels: [], msg: 'Không có khách sạn nào được tìm thấy' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/hotels/trash
// @desc:   Lấy danh sách các khách sạn bị xóa tạm thời
router.get('/trash', async (req, res) => {
  try {
    const hotels = await Hotel.find({ isDeleted: true })
    if (hotels.length > 0) {
      return res.status(200).json({ hotels })
    } else {
      return res.status(200).json({ hotels: [], msg: 'Không có khách sạn nào bị xóa' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/hotels/
// @desc:   Lấy danh sách các khách sạn hiện tại
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({ isDeleted: false })
    if (hotels.length > 0) {
      return res.status(200).json({ hotels })
    } else {
      return res.status(200).json({ hotels: [], msg: 'Không có khách sạn nào bị xóa' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/hotels/:id
// @desc:   Cập nhật thông tin khách sạn
router.put('/:id', async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn' })
    }
    const updatedHotel = {
      ...req.body
    }

    hotel = await Hotel.findByIdAndUpdate(req.params.id, updatedHotel, { new: true })

    return res.status(200).json({ msg: 'Cập nhật khách sạn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/hotels/:id
// @desc:   Xóa vĩnh viễn khách sạn
router.delete('/:id', async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    hotel = await Hotel.findOneAndDelete(req.params.id)
    return res.status(200).json({ msg: 'Xóa khách sạn vĩnh viễn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/hotels/:id
// @desc:   Xóa tạm thời khách sạn
router.put('/del/:id', async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    if (hotel.isDeleted === true) {
      return res.status(400).json({ msg: 'Khách sạn đã bị xóa' })
    }
    const updateDelete = {
      isDeleted: true
    }
    hotel = await Hotel.findByIdAndUpdate(req.params.id, updateDelete, { new: true })
    return res.status(200).json({ msg: 'Xóa khách sạn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/hotels/trash/:id
// @desc:   Khôi phục khách sạn
router.put('/trash/:id', async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    if (hotel.isDeleted === false) {
      return res.status(400).json({ msg: 'Khách sạn chưa bị xóa' })
    }
    const updateRestore = {
      isDeleted: false
    }
    hotel = await Hotel.findByIdAndUpdate(req.params.id, updateRestore, { new: true })
    return res.status(200).json({ msg: 'Khôi phục khách sạn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/hotels/:id
// @desc:   Lấy thông tin khách sạn
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const rooms = await Rooms.find({ hotelID: hotel._id }).lean()
    if (!hotel) {
      return res.status(404).json({ msg: 'Không tìm thấy khách sạn này' })
    }
    return res.status(200).json({ hotel, rooms })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/hotels/by-city
// @desc:   Lấy danh sách khách sạn của thành phố cụ thể
router.post('/by-city', async (req, res, next) => {
  const { slug } = req.body
  const city = await City.findOne({ slug }).lean()
  const result = await Hotel.find({ cityID: city._id }).lean()
  if (!result) {
    return res.status(200).json({ msg: 'Thành phố không có khách sạn nào', city })
  }
  res.status(200).json({ city, result })
})

module.exports = router
