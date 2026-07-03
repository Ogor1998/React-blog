const express = require('express');
const router = express.Router();
const { upload } = require('../cloudinary')
const { profileFind, profileUpdate } = require('../controllers/profiles')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../middleware')


router.get('/:username', catchAsync(profileFind))
router.put('/:username', upload.single("image"), isLoggedIn, catchAsync(profileUpdate))



module.exports = router;