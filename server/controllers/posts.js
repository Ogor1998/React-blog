const Blog = require('../models/Post')
const Comment = require('../models/Comment')
const AppError = require('../AppError')
const { uploadToCloudinary } = require('../cloudinary')


module.exports.indexPage = async (req, res) => {
    const allPosts = await Blog.find({}).populate("author", "username")
    res.json(allPosts)
    // console.log(allPosts)
}

module.exports.renderNewPost = (req, res) => {
    res.json({ message: "New post" })
}

module.exports.createPost = async (req, res) => {
    const { title, content, category } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: "Image required" });
    }
    const result = await uploadToCloudinary(req.file.buffer);
    const newPost = new Blog({
        title,
        author: req.user._id,
        content,
        category,
        image: result.secure_url
    })
    await newPost.save();
    console.log(newPost)
    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });
}

module.exports.renderPost = async (req, res) => {
    const { id } = req.params;
    const post = await Blog.findById(id).populate("author").populate({
        path: "comments",
        populate: {
            path: "author"
        }
    });
    console.log(post)
    if (!post) {
        throw new AppError("Post Not found", 404)
    }
    res.json(post)
    // console.log(post)
}

module.exports.updatePost = async (req, res) => {
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(400).json({ message: "Not Found" })
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer)
            post.image = result.secure_url;
        }
        await post.save();
        res.json(post)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id)
    res.json({ message: "Post deleted" })
    console.log("deleted")
}







