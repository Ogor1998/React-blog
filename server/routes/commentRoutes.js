const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { createComment, deleteComment } = require('../controllers/comments')
const { isLoggedIn, isCommentAuthor } = require('../middleware')


router.post("/comments", isLoggedIn, catchAsync(createComment));

router.delete("/comments/:commentId", isLoggedIn, isCommentAuthor, catchAsync(deleteComment))


module.exports = router;