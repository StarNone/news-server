const {Router} = require('express')
const router = Router()
const {auth} = require('../controller/auth')
const {addComment, getComment, deleteComment, getCommentByUser} = require('../controller/comment')

router.post('/', auth, addComment)
router.get('/user/:id', getCommentByUser)
router.get('/:id', getComment)
router.delete('/:id', deleteComment)

module.exports = router