const {Router} = require('express')
const router = Router()
const {addCategory, deleteCategory, getCategory, getNewsByCategory, getAllNewsByCategory} = require('../controller/category')

router.post('/', addCategory)
router.get('/', getCategory)
router.get('/news', getNewsByCategory)
router.get('/:id', getAllNewsByCategory)
router.delete('/:id', deleteCategory)

module.exports = router