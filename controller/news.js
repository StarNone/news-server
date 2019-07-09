const newsModel = require('../model/news')
const categoryModel = require('../model/category')
const userModel = require('../model/user')
const mongoose = require('mongoose')

async function addNews (req, res, next) {
  try {
    const userId = req.user.userId
    const {title, desc, content, categoryId} = req.body
    const userData = await userModel.findOne({
      _id: mongoose.Types.ObjectId(userId)
    })
    const categoryData = await categoryModel.findOne({
      _id: mongoose.Types.ObjectId(categoryId)
    })
    const newsData = await newsModel.create({
      title,
      author: userData._id,
      desc,
      content,
      category: categoryData.title
    })
    await categoryData.news.push(newsData._id)
    await categoryData.save()
    res.json({
      code: 200,
      msg: '新闻发布成功'
    })
  } catch (error) {
    next(error)
  }
}

async function checkNews (req, res, next) {
  try {
    const {status, newsId} = req.body
    await newsModel.update({
      _id: mongoose.Types.ObjectId(newsId)
    }, {
      status
    })
    res.json({
      code: 200,
      msg: '新闻审核成功'
    })
  } catch (error) {
    next(error)
  }
}

async function getAllNews (req, res, next) {
  try {
    const {status} = req.query
    if (status == 3) {
      const data = await newsModel.find().populate({path: 'author', options: {select: '-password'}})
      res.json({
        code: 200,
        data
      })
    } else {
      const data = await newsModel.find({status}).populate({path: 'author', options: {select: '-password'}})
      res.json({
        code: 200,
        data
      })
    }
  } catch (error) {
    next(error)
  }
}

async function getNewsByUser (req, res, next) {
  try {
    const userId = req.user.userId
    const {status} = req.query
    if (status == 3) {
      const data = await newsModel.find({
        author: userId
      })
      res.json({
        code: 200,
        data
      })
    } else {
      const data = await newsModel.find({
        author: userId,
        status
      })
      res.json({
        code: 200,
        data
      })
    }
  } catch (error) {
    next(error)
  }
}

async function getNewsById (req, res, next) {
  try {
    const {id} = req.params
    const data = await newsModel.findById(id)
    .populate({
      path: 'author',
      options: {
        select: '-password'
      }
    })
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addNews,
  checkNews,
  getNewsByUser,
  getAllNews,
  getNewsById
}