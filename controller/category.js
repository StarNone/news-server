const categoryModel = require('../model/category')
const mongoose = require('mongoose')

async function addCategory (req, res, next) {
  try {
    const {name} = req.body
    await categoryModel.create({
      name
    })
    res.json({
      code: 200,
      msg: '添加分类成功'
    })
  } catch (error) {
    next(error)
  }
}

async function deleteCategory (req, res, next) {
  try {
    const id = req.params.id
    const categroydata = await categoryModel.findById(id)
    if (categroydata) {
      await categoryModel.remove({_id: mongoose.Types.ObjectId(id)})
      res.json({
        code: 200,
        msg: '删除分类成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '该分类不存在'
      })
    }
  } catch (error) {
    next(error)
  }
}

async function getCategory (req, res, next) {
  try {
    const data = await categoryModel.find().sort({_id: -1})
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    next(error)
  }
}

async function getNewsByCategory (req, res, next) {
  try {
    let {newsSize = 4} = req.query
    newsSize = Number(newsSize)
    const data = await categoryModel.find()
    .sort({_id: -1})
    .populate({
      path: 'news',
      match: {status: 1},
      options: {
        limit: newsSize
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

async function getAllNewsByCategory (req, res, next) {
  try {
    const {id} = req.params
    const data = await categoryModel.findById(id)
    .populate({
      path: 'news',
      match: {status: 1},
      options: {
        populate: 'author',
        options: {
          select: '-password'
        }
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
  addCategory,
  deleteCategory,
  getCategory,
  getNewsByCategory,
  getAllNewsByCategory
}