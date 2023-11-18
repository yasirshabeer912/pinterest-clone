const asyncHandler = require('express-async-handler');
const User = require('../models/User')
const bycrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword,name } = req.body
    const checkUser = await User.findOne({ email })

    if (checkUser) {
        res.status(402).json({ message: "This Email is Already Taken" })
        return
    }

    if (password !== confirmPassword) {
        res.status(402).json({ message: "Passwords Don't Match" })
        return
    } else {
        try {
            const salt = await bycrypt.genSalt(12)
            const hashedPassword = await bycrypt.hash(password, salt)
            const RegisterUser = await User.create({
                name,
                email,
                password: hashedPassword

            })

            if (RegisterUser) {
                res.status(200).json({
                    message: "Registered Successfully",
                    name,
                    email
                })
            } else {
                res.status(500).json({
                    message: "Something went wrong"
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
});


const loginUser = asyncHandler(async (req, res) =>{
    const {email,password} = req.body
    const checkUser = await User.findOne({ email })
    if (!checkUser) {
        res.status(402).json({ message: "Doesn't Exists" })
        return
    }

    const comparePassword = await bycrypt.compare(password,checkUser.password)
    if(comparePassword){
        // Create a token payload with the user ID
        const payload = { userId: checkUser._id };

        // Sign the token with the payload and secret key
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
        });
        res.status(200).json({message:"Logged In Successfully",token})
    }else{
        res.status(402).json({ message: "Password is Incorrect" })
    }

})

const getToken = asyncHandler(async (req, res) => {
    const userId = req.userId;
    res.json({ userId });
  })

const getUserDetails = asyncHandler(async (req, res) => {
    const requestedUserId = req.params.id; 

    try {
        const user = await User.findById(requestedUserId);

        if (user) {
            const userDetails = {
                _id: user._id,
                name:user.name,
                email: user.email,
            };

            res.status(200).json( userDetails );
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});

module.exports = { registerUser, loginUser, getToken, getUserDetails };
