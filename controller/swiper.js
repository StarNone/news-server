const swiperModel = require('../model/swiper')
const mongoose = require('mongoose')

async function addSwiper (req, res, next) {
  try {
    const {img, title, author, content} = req.body
    const swiper = await swiperModel.create({
      img,
      title,
      author,
      content
    })
    res.json({
      code: 200,
      msg: '轮播图添加成功'
    })
  } catch (error) {
    next(error)
  }
}

async function getSwiper (req, res, next) {
  try {
    let {pn = 1, size = 4} = req.query
    pn = Number(pn)
    size = Number(size)
    const data = await swiperModel.find()
    .sort({_id: -1})
    .skip((pn - 1) * size)
    .limit(size)
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    next()
  }
}

async function getSwiperById (req, res, next) {
  try {
    const {id} = req.params
    const data = await swiperModel.findById(id)
      res.json({
        code: 200,
        data
      })
  } catch (error) {
    next(error)
  }
}

async function deleteSwiper (req, res, next) {
  try {
    const {id} = req.params
    const swiperData = await swiperModel.findById(id)
    if (swiperData) {
      await swiperModel.remove({_id: mongoose.Types.ObjectId(id)})
      res.json({
        code: 200,
        msg: '轮播图删除成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '该轮播图已不存在'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addSwiper,
  getSwiper,
  getSwiperById,
  deleteSwiper
}