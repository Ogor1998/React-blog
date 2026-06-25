const express = require('express')
const router = express.Router();
const { login, register, logout } = require('../controllers/users')
const { upload } = require('../cloudinary')


router.post('/register', upload.single('image'), register)

router.post("/login", login);


router.post("/logout", logout)


module.exports = router;