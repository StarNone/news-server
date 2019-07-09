const mongoose = require('mongoose')

const user = new mongoose.Schema({
  avatar: {
    type: String,
    default: 'http://image.yaojunrong.com/zhenxiang.jpg'
  },
  account: {
    type: String,
    unique: true
  },
  password: String,
  nikename: String,
  sex: Number,
  birthday: String,
  hobby: String,
  address: Array,
  limitTime: String,
  signature: {
    type: String,
    default: '这个家伙很懒，什么都没有写...'
  }
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)