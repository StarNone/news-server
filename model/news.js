const mongoose = require('mongoose')

const news = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  desc: String,
  content: String,
  status: {
    type: Number,
    default: 0
  },
  category: String
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('news', news)