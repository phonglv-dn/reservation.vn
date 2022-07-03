const express = require('express')
const router = express.Router()

const City = require('./model')

// @route:  POST /api/cities/add
// @desc:   Thêm thành phố mới
router.post('/add', async (req, res) => {
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
  const cityObj = {
    name: req.body.name,
    slug: getSlug(req.body.name),
    desc: req.body.desc
  }
  if (req.body._id) {
    cityObj._id = req.body._id
  }
  try {
    let city = await City.findOne({ slug: getSlug(req.body.name) })
    if (city) {
      return res.status(400).json({ msg: 'Thành phố đã tồn tại' })
    }
    city = new City(cityObj)
    const error = city.validateSync()
    if (error) {
      return res.status(400).json(error.errors)
    }

    await city.save()
    return res.status(201).json({ msg: 'Thêm thành phố thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/cities/all-cities
// @desc:   Lấy danh sách tất cả thành phố
router.get('/all-cities', async (req, res) => {
  try {
    const cities = await City.find()
    if (cities.length > 0) {
      return res.status(200).json({ cities })
    } else {
      return res.status(200).json({ cities: [], msg: 'Không có thành phố nào được tìm thấy' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/cities/
// @desc:   Lấy danh sách tất cả thành phố hiện tại
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({ isDeleted: false })
    if (cities.length > 0) {
      return res.status(200).json({ cities })
    } else {
      return res.status(200).json({ cities: [], msg: 'Không có thành phố nào bị xóa' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/cities/:id
// @desc:   Lấy thông tin thành phố
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ msg: 'Không tìm thấy thành phố này' })
    }
    return res.status(200).json({ city })
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/cities/:id
// @desc:   Cập nhật thông tin thành phố
router.put('/:id', async (req, res) => {
  try {
    let city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ msg: 'Không tìm thấy thành phố này' })
    }
    const updatedCity = {
      ...req.body
    }

    city = await City.findByIdAndUpdate(req.params.id, updatedCity, { new: true })

    return res.status(200).json({ msg: 'Cập nhật thành phố thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/cities/:id
// @desc:   Xóa vĩnh viễn thành phố
router.delete('/:id', async (req, res) => {
  try {
    let city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ msg: 'Không tìm thấy thành phố này' })
    }
    city = await City.findOneAndDelete(req.params.id)
    return res.status(200).json({ msg: 'Xóa thành phố vĩnh viễn thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  DELETE /api/cities/:id
// @desc:   Xóa tạm thời thành phố
router.put('/del/:id', async (req, res) => {
  try {
    let city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ msg: 'Không tìm thấy thành phố này' })
    }
    if (city.isDeleted === true) {
      return res.status(400).json({ msg: 'Thành phố đã bị xóa' })
    }
    const updateDelete = {
      isDeleted: true
    }
    city = await City.findByIdAndUpdate(req.params.id, updateDelete, { new: true })
    return res.status(200).json({ msg: 'Xóa thành phố thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  GET /api/cities/trash
// @desc:   Lấy danh sách các thành phố đã bị xóa tạm thời
router.get('/trash', async (req, res) => {
  try {
    const cities = await City.find({ isDeleted: true })
    if (cities.length > 0) {
      return res.status(200).json({ cities })
    } else {
      return res.status(200).json({ cities: [], msg: 'Không có thành phố nào bị xóa' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

// @route:  PUT /api/cities/trash/:id
// @desc:   Khôi phục thành phố
router.put('/trash/:id', async (req, res) => {
  try {
    let city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ msg: 'Không tìm thấy thành phố này' })
    }
    if (city.isDeleted === false) {
      return res.status(400).json({ msg: 'Thành phố chưa bị xóa' })
    }
    const updateRestore = {
      isDeleted: false
    }
    city = await City.findByIdAndUpdate(req.params.id, updateRestore, { new: true })
    return res.status(200).json({ msg: 'Khôi phục thành phố thành công' })
  } catch (err) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})

module.exports = router
