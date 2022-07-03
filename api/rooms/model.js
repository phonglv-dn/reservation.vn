const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên phòng'],
      trim: true
    },
    utilitie: {
      type: String
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng cung cấp giá của phòng']
    },
    sale: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      required: [true, 'Vui lòng cung cấp số lượng phòng']
    },
    hotelID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hotels',
      required: true
    },
    capacity: {
      type: Number,
      required: [true, 'Vui lòng cung cấp số người phù hợp với phòng']
    },
    description: {
      type: String,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Rooms', roomSchema)
