const {Router} = require('express')
const router = Router()
const {addSwiper, getSwiper, deleteSwiper, getSwiperById} = require('../controller/swiper')

router.post('/', addSwiper)
router.get('/', getSwiper)
router.get('/details/:id', getSwiperById)
router.delete('/:id', deleteSwiper)

module.exports = router