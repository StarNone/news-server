const mongoose = require('mongoose')

const swiper = new mongoose.Schema({
  img: String,
  content: String,
  title: String,
  author: String,
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('swiper', swiper)