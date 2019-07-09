const mongoose = require('mongoose')

const category = new mongoose.Schema({
  news: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'news'
  }],
  name: String
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('category', category)