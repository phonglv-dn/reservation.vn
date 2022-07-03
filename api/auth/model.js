const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên của bạn']
    },
    email: {
      type: String,
      required: [true, 'Vui lòng cung cấp địa chỉ email'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Địa chỉ email không hợp lệ'
      ]
    },
    phone: {
      type: String,
      match: [
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      ]
    },
    password: {
      type: String,
      required: [true, 'Vui lòng cung cấp mật khẩu'],
      select: false
    },
    profilePicUrl: {
      type: String,
      default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },
    verificationToken: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
