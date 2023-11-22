const express = require('express')
const {registerUser,loginUser,getToken,getUserDetails} = require('../controllers/authController')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');



  

router.post('/decodeToken', verifyToken, getToken);
router.get('/getUser/:id',  getUserDetails);
router.post('/',registerUser)
router.post('/auth',loginUser)
module.exports = router