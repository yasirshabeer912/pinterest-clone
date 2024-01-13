const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const asyncHandler = require('express-async-handler');
const User = require('../models/User')
const bycrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const passport = require('passport');


clientid = '1031099173757-baldfvvi8la4cghp6j4k3u4vsbau0fkj.apps.googleusercontent.com'
clientsecret = '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'

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Check if a user with the same email already exists
                    const existingUser = await User.findOne({ email: profile.emails[0].value });

                    if (existingUser) {
                        // Update the existing user's information if needed
                        // For example, you can update the name and image
                        existingUser.name = profile.displayName;
                        existingUser.image = profile.photos[0].value;
                        await existingUser.save();

                        user = existingUser;
                    } else {
                        // Create a new user
                        user = new User({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            image: profile.photos[0].value
                        });

                        await user.save();
                    }
                }

                // Create a token payload with the user ID
                const payload = { userId: user._id };

                // Sign the token with the payload and secret key
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '30d',
                });

                return done(null, { user: { id: user._id, name: user.name, email: user.email, image: user.image }, token });
                // Include user ID, name, email, image, and token in the response
            } catch (error) {
                return done(error, null);
            }
        }
    ));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword, name } = req.body
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


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const checkUser = await User.findOne({ email })
    if (!checkUser) {
        res.status(402).json({ message: "Doesn't Exists" })
        return
    }

    const comparePassword = await bycrypt.compare(password, checkUser.password)
    if (comparePassword) {
        // Create a token payload with the user ID
        const payload = { userId: checkUser._id };

        // Sign the token with the payload and secret key
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.status(200).json({ message: "Logged In Successfully", token })
    } else {
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
                name: user.name,
                email: user.email,
                image: user.image
            };

            res.status(200).json(userDetails);
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

const updateUser = async (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    const { name, email, password } = req.body;
    const image = req.file ? req.file.filename : null;
    // console.log(image);
    try {
        // Assuming you have a User model and want to update name, email, password, and image
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password, image },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getToken,
    getUserDetails,
    updateUser,
};
