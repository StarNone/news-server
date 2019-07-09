const {Router} = require('express')
const router = Router()
const {checkAccount, register, login, getUserById, changePassword, changeMessage, changeAvatar, getAllUser, manageUser, checkUser} = require('../controller/user')
const {auth} = require('../controller/auth')

router.post('/check', checkAccount)
router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getUserById)
router.get('/msg', getAllUser)
router.post('/', auth, changePassword)
router.put('/', auth, changeMessage)
router.put('/avatar', auth, changeAvatar)
router.put('/manage', manageUser)
router.post('/checkUser', checkUser)

module.exports = router