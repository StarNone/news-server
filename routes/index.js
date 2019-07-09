var express = require('express');
var router = express.Router();
const adminRoutes = require('./admin')
const swiperRoutes = require('./swiper')
const userRoutes = require('./user')
const newsRoutes = require('./news')
const categoryRoutes = require('./category')
const commentRoutes = require('./comment')
const uploadRoutes = require('./upload')

router.use('/admin', adminRoutes)
router.use('/swiper', swiperRoutes)
router.use('/user', userRoutes)
router.use('/news', newsRoutes)
router.use('/category', categoryRoutes)
router.use('/comment', commentRoutes)
router.use('/uploadToken', uploadRoutes)

module.exports = router;
