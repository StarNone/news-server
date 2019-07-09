const {Router} = require('express')
const router = Router()
const {auth} = require('../controller/auth')
const {addNews, checkNews, getNewsByUser, getAllNews, getNewsById} = require('../controller/news')

router.post('/', auth, addNews)
router.put('/', checkNews)
router.get('/', getAllNews)
router.get('/user', auth, getNewsByUser)
router.get('/:id', getNewsById)

module.exports = router