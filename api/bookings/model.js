const mongoose = require('mongoose')

const bookingsSchema = new mongoose.Schema(
  {
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Cities'
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Hotels'
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Rooms'
    },
    checkinDate: {
      type: String,
      required: true
    },
    checking: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    userName: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên theo căn cước']
    },
    email: {
      type: String,
      required: [true, 'Vui lòng cung cấp email'],
      unique: false
    },
    phone: {
      type: String,
      match: [
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      ]
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isCancel: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Bookings', bookingsSchema)
