const userModel = require('../model/user')
const signUtil = require('../utils/signToken')
const mongoose = require('mongoose')

async function checkAccount (req, res, next) {
  try {
    const {account} = req.body
    const user = await userModel.findOne({
      account: account
    })
    if (user) {
      res.json({
        code: 400,
        msg: '该用户名已被注册'
      })
    } else {
      res.json({
        code: 200
      })
    }
  } catch (error) {
    next(error)
  }
}

async function register (req, res, next) {
  try {
    const {account, password, nikename, sex, birthday, address, hobby} = req.body
    await userModel.create({
      account,
      password,
      nikename,
      sex,
      birthday,
      address,
      hobby
    })
    res.json({
      code: 200,
      msg: '注册成功'
    })
  } catch (error) {
    next(error)
  }
}

async function login (req, res, next) {
  try {
    const {account, password} = req.body
    if (account && password) {
      const user = await userModel.findOne({
        account
      })
      if (user) {
        if (password === user.password) {
          const token = signUtil({userId: user._id})
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
          msg: '用户名不存在'
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

async function getUserById (req, res, next) {
  try {
    const userId = req.user.userId
    const userData = await userModel.findOne({
      _id: mongoose.Types.ObjectId(userId)
    }).select('-password')
    res.json({
      code: 200,
      data: userData
    })
  } catch (error) {
    next(error)
  }
}

async function getAllUser (req, res, next) {
  try {
    const data = await userModel.find().select('-password')
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    next(error)
  }
}

async function changePassword (req, res, next) {
  try {
    const id = req.user.userId
    const {password, changePassword} = req.body
    const user = await userModel.findById(id)
    if (password === user.password) {
      await userModel.update({
        _id: mongoose.Types.ObjectId(id)
      }, {
        password: changePassword
      })
      res.json({
        code: 200,
        msg: '密码修改成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '密码输入错误'
      })
    }
  } catch (error) {
    next(error)
  }
}

async function changeMessage (req, res, next) {
  try {
    const userId = req.user.userId
    const {nikename, sex, birthday, hobby, address,signature} = req.body
    await userModel.update({
      _id: mongoose.Types.ObjectId(userId)
    }, {
      nikename,
      sex,
      birthday,
      hobby,
      address,
      signature
    })
    res.json({
      code: 200,
      msg: '信息修改成功'
    })
  } catch (error) {
    next(error)
  }
}

async function changeAvatar (req, res, next) {
  try {
    const userId = req.user.userId
    const {avatar} = req.body
    await userModel.update({
      _id: mongoose.Types.ObjectId(userId)
    }, {
      avatar
    })
    res.json({
      code: 200,
      msg: '头像修改成功'
    })
  } catch (error) {
    next(error)
  }
}

async function manageUser (req, res, next) {
  try {
    const {id, limitTime} = req.body
    await userModel.update({
      _id: mongoose.Types.ObjectId(id)
    }, {
      limitTime
    })
    res.json({
      code: 200,
      msg: '操作成功'
    })
  } catch (error) {
    next(error)
  }
}

async function checkUser (req, res, next) {
  try {
    const {account} = req.body
    const userData = await userModel.findOne({
      account
    }).select('-password')
    res.json({
      code: 200,
      data: userData
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkAccount,
  register,
  login,
  getUserById,
  changePassword,
  changeMessage,
  changeAvatar,
  getAllUser,
  manageUser,
  checkUser
}