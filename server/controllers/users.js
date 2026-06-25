const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User')
const { uploadToCloudinary } = require('../cloudinary')

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        req.logIn(user, (err) => {
            if (err) next(new AppError('Login failed', 500));
            res.json({ message: `Welcome back, ${user.username}`, user: user });

        });

    })(req, res, next);
}


module.exports.register = async (req, res, next) => {
    try {
        const { password, ...userData } = req.body;
        const user = new User(userData)
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer)
            user.image = result.secure_url
        }
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
            console.log(registeredUser)
            res.json({ message: 'Registered Successfully', user: registeredUser })
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Logout Failed" })
        res.json({ message: "Logged out" })
    })
}

