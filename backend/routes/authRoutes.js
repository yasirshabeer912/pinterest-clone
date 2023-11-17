const express = require('express')
const {registerUser,loginUser,getToken,getUserDetails} = require('../controllers/authController')
const router = express.Router();
const jwt = require('jsonwebtoken')


// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        console.log('huh');
      return res.status(403).json({ message: 'Token is missing' });
    }
  
    try {
        const { userId}   = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userId
        console.log("fetchuser",userId)
        next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  

router.post('/decodeToken', verifyToken, getToken);
router.get('/getUser/:id',  getUserDetails);
router.post('/',registerUser)
router.post('/auth',loginUser)
module.exports = router