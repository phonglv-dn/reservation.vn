const mongoose = require('mongoose')

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên thành phố'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: [true, 'Vui lòng cung cấp một câu mô tả ngắn về thành phố']
    },
    cityPicUrl: {
      type: String,
      default: 'https://user-images.githubusercontent.com/22660833/84226637-835ba500-ab0c-11ea-8bdf-c07b377f9f7a.png'
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

module.exports = mongoose.model('Cities', citySchema)
