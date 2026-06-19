if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User')
const session = require('express-session')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Blog = require("./models/Post");
const AppError = require("./AppError")
const catchAsync = require("./utils/catchAsync");
const postRoutes = require("./routes/postRoutes");
const { AppBlocking } = require('@mui/icons-material');
const Comment = require('./models/Comment')
const { uploadToCloudinary } = require('./cloudinary')
const { upload } = require('./cloudinary')
const profileRoutes = require('./routes/profileRoutes')

// const { isLoggedIn } = require('./middleware')


mongoose.connect("mongodb://127.0.0.01:27017/blog").then(() => {
    console.log(`Mongo Connection Active`)
}).catch((err) => {
    console.log(`Mongo Failed Because ${err}`)
})

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'Keyboard Cat'
// opts.issuer = 'test@google.com'
// opts.audience = 'theinternet.com'
// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ _id: jwt_payload.sub }, function (err, user) {
//         if (err) {
//             return done(err, false)
//         }
//         if (user) {
//             return done(null, user)
//         } else {
//             return done(null, false)
//         }
//     })
// }))


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie:
    {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }

}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/posts", postRoutes)
app.use('/profile', profileRoutes)


app.post("/posts/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = new Comment({
            author: req.user._id,
            content
        });

        await comment.save();
        await comment.populate({
            path: "author",
            select: "username"
        });

        post.comments.push(comment._id);
        await post.save();
        console.log(comment)
        res.json(comment)
    } catch (err) {
        console.log("🔥 ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    const { postId, commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
    console.log("Delted comment")
    res.json({ message: 'Comment deleted' })
})


app.get('/check-auth', (req, res) => {
    console.log("Session:", req.session)
    console.log("Is authenticated:", req.isAuthenticated())
    console.log("User:", req.user)
    if (req.isAuthenticated()) {
        res.json({ isLoggedIn: true, user: req.user })
    } else {
        res.json({ isLoggedIn: false })
    }
})


app.get('/register', (req, res) => {
    res.json({ message: "You know where you are with" })
})

app.get('/login', (req, res) => {
    res.json({ message: "You know where you are with" })
})

app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        console.log("Authenticated user:", user);
        req.logIn(user, (err) => {
            if (err) next(new AppError('Login failed', 500));
            res.json({ message: "Logged innnnn", user: user.username });

        });

    })(req, res, next);
});

app.post('/register', upload.single('image'), async (req, res, next) => {
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
})




app.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Logout Failed" })
        res.json({ message: "Logged out" })
    })
})


app.all(/(.*)/, (req, res, next) => {
    next(new AppError('Page not found', 404))
})

app.use((err, req, res, next) => {
    console.error(err); // ← log full error server-side for debugging

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({ message: `Invalid Id` });
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