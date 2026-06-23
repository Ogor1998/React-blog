const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const { createLike, deleteLike } = require('../controllers/likes')
const { isLoggedIn } = require('../middleware')

router.post('/like', isLoggedIn, catchAsync(createLike))

router.delete('/like', isLoggedIn, catchAsync(deleteLike))



module.exports = router;