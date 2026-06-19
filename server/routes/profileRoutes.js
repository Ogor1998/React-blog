const express = require('express');
const router = express.Router();
const { upload } = require('../cloudinary')
const { profileFind, profileUpdate } = require('../controllers/profiles')
const catchAsync = require('../utils/catchAsync')


router.get('/:id', catchAsync(profileFind))
router.put('/:id', upload.single("image"), catchAsync(profileUpdate))



module.exports = router;