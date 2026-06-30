const express = require('express');
const router = express.Router();
const { upload } = require('../cloudinary')
const { profileFind, profileUpdate } = require('../controllers/profiles')
const catchAsync = require('../utils/catchAsync')


router.get('/:username', catchAsync(profileFind))
router.put('/:username', upload.single("image"), catchAsync(profileUpdate))



module.exports = router;