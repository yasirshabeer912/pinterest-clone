const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes')
const path = require('path')
require('dotenv').config();
const connectDb = require('./config/db')
connectDb();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Setup session
app.use(
    session({
        secret: "khfslakdfhiu@9skdjfghkj",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(
    cors({
        origin: "https://pinterest-clone-yasir.vercel.app", // Replace with your client's origin
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send('api is running')
})

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static('./uploads'));
app.use('/api/users', authRoutes);
app.use('/api/', postRoutes)



// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "https://pinterest-clone-yasir.vercel.app",
    failureRedirect: "https://pinterest-clone-yasir.vercel.app"
}))

app.get("/login/sucess", async (req, res) => {
    // console.log(req.user);
    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});


app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("https://pinterest-clone-yasir.vercel.app");
    })
})
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
