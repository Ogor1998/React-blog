if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User')
const session = require('express-session')
const mongoose = require('mongoose')
const Blog = require("./models/Post");
const AppError = require("./AppError")
const catchAsync = require("./utils/catchAsync");
const postRoutes = require("./routes/postRoutes");
const Comment = require('./models/Comment')
const { uploadToCloudinary } = require('./cloudinary')
const { upload } = require('./cloudinary')
const profileRoutes = require('./routes/profileRoutes')
const commentRoutes = require('./routes/commentRoutes')
const likeRoutes = require('./routes/likeRoutes')
const userRoutes = require('./routes/userRoutes')



mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    console.log(`Mongo Connection Active`)
}).catch((err) => {
    console.log(`Mongo Failed Because ${err}`)
})


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// app.use((req, res, next) => {
//     console.log("Incoming request:", req.method, req.url)  // ← add this globally
//     next()
// })

app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie:
    {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    }

}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/posts", postRoutes)
app.use('/profile', profileRoutes)
app.use('/posts/:id', commentRoutes)
app.use('/posts/:id', likeRoutes)
app.use('/', userRoutes)


app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isLoggedIn: true, user: req.user })
    } else {
        res.json({ isLoggedIn: false })
    }
})




app.all(/(.*)/, (req, res, next) => {
    next(new AppError('Page not found', 404))
})

app.use((err, req, res, next) => {
    console.error(err); // ← log full error server-side for debugging

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({ message: `Post Not found` });
    }

    // Mongoose validation errors (missing required fields, etc)
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(", ") });
    }

    // Duplicate key error (e.g. unique email/username already exists)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({ message: `${field} already exists` });
    }

    // Multer file upload errors
    if (err.name === "MulterError") {
        return res.status(400).json({ message: err.message });
    }

    // Fallback to your custom AppError or generic error
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).json({ statusCode, message });
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})