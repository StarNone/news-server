var express = require('express')
var router = express.Router()
const {register, login, getAdminById} = require('../controller/admin')
const {auth} = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/msg', auth, getAdminById)

module.exports = router