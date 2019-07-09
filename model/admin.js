const mongoose = require('mongoose')

const admin = new mongoose.Schema({
  avatar: {
    type: String,
    default: 'http://hbimg.b0.upaiyun.com/655ba5b31bc6243428a306b10a7f895b36d3d3d35a1e-5phgk4_fw658'
  },
  username: {
    type: String,
    default: '管理员'
  },
  account: String,
  password: String
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('admin', admin)