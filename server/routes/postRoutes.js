const express = require('express')
const router = express.Router();
const { indexPage, renderNewPost, createPost, renderPost, updatePost, deletePost } = require('../controllers/posts')
const catchAsync = require('../utils/catchAsync')
const { upload } = require('../cloudinary')
const { isAuthor, isLoggedIn, validatePost } = require('../middleware')

router.get("/", catchAsync(indexPage))
router.get("/new", catchAsync(renderNewPost))
router.post("/new", isLoggedIn, validatePost, upload.single("image"), catchAsync(createPost))
router.get("/:id", catchAsync(renderPost))
router.patch("/:id", isLoggedIn, isAuthor, validatePost, upload.single("image"), catchAsync(updatePost))
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deletePost))


module.exports = router;