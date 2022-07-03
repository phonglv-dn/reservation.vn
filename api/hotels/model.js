const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên khách sạn'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    typeStay: {
      type: String,
      default: 'Khách sạn',
      enum: ['Khách sạn', 'Nhà nghỉ', 'Home Stay']
    },
    hotelPicsUrl: ['https://user-images.githubusercontent.com/22660833/84226637-835ba500-ab0c-11ea-8bdf-c07b377f9f7a.png'],
    address: {
      type: String,
      required: [true, 'Vui lòng cung cấp địa chỉ của bạn']
    },
    cityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cities',
      required: true
    },
    ratingStar: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        review: String
      }
    ],
    description: {
      type: String,
      required: [true, 'Vui lòng cung cấp mô tả cho khách sạn'],
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

module.exports = mongoose.model('Hotels', hotelSchema)
