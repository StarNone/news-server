const commentModel = require('../model/comment')
const mongoose = require('mongoose')
const newsModel = require('../model/news')

async function addComment (req, res, next) {
  try {
    const userId = req.user.userId
    const {newsId, content} = req.body
    await commentModel.create({
      user: userId,
      newsId,
      content
    })
    res.json({
      code: 200,
      msg: '评论发表成功!'
    })
  } catch (error) {
    next(error)
  }
}

async function getComment (req, res, next) {
  try {
    const newsId = req.params.id
    const data = await commentModel.find({
      newsId
    })
    .populate({
      path: 'user',
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

async function getCommentByUser (req, res, next) {
  try {
    const userId = req.params.id
      const data = await commentModel.find({
        user: userId
      }).populate({
        path: 'user',
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

async function deleteComment (req, res, next) {
  try {
    const id = req.params.id
    const commentdata = await commentModel.findById(id)
    if (commentdata) {
      await commentModel.remove({_id: mongoose.Types.ObjectId(id)})
      res.json({
        code: 200,
        msg: '评论删除成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '该评论已经不存在'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addComment,
  getComment,
  deleteComment,
  getCommentByUser
}