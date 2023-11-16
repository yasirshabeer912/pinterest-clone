const express = require('express')
const {registerUser,loginUser} = require('../controllers/authController')
const router = express.Router();

router.post('/',registerUser)
router.post('/auth',loginUser)


module.exports = router