const adminModel = require('../model/admin')
const signUtil = require('../utils/signToken')
const mongoose = require('mongoose')

async function register (req, res, next) {
  try {
    const {account, password, lock} = req.body
    const admin = await adminModel.findOne({
      account: account
    })
    if (admin) {
      res.json({
        code: 400,
        msg: '该账号已被注册'
      })
    } else {
      if (lock === 'hzx4123') {
        await adminModel.create({
          account,
          password
        })
        res.json({
          code: 200,
          msg: '注册成功'
        })
      } else {
        res.json({
          code: 400,
          msg: '密钥验证失败！'
        })
      }
      
    }
  } catch (error) {
    next(error)
  }
}

async function login (req, res, next) {
  try {
    const {account, password} = req.body
    if (account && password) {
      const admin = await adminModel.findOne({
        account
      })
      if (admin) {
        if (password === admin.password) {
          const token = signUtil({userId: admin._id})
          res.json({
            code: 200,
            msg: '登陆成功',
            data: {
              token
            }
          })
        } else {
          res.json({
            code: 400,
            msg: '密码不正确'
          })
        }
      } else {
        res.json({
          code: 400,
          msg: '账户名不存在'
        })
      }
    } else {
      res.json({
        code: 400,
        msg: '缺少必要参数'
      })
    }
  } catch (error) {
    next(error)
  }
}

async function getAdminById (req, res, next) {
  try {
    const adminId = req.user.userId
    const adminData = await adminModel.findOne({
      _id: mongoose.Types.ObjectId(adminId)
    }).select('-password')
    res.json({
      code: 200,
      data: adminData
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  getAdminById
}