const express = require('express')
const { register, login, currentUser } = require('../controllers/auth')
const { authCheck, adminCheck } = require('../middlewares/authMiddleware')

const router = express.Router()

// @ENDPOINT http://localhost:5002/api/
router.post('/register', register)
router.post('/login', login)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)


module.exports = router