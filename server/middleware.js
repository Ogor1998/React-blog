const Blog = require("./models/Post");
const Comment = require("./models/Comment")
const { commentSchema, postSchema } = require('./schema/schemas')
const AppError = require('./AppError')
module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" })
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const post = await Blog.findById(id)
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }
    if (!req.user) {
        return res.status(401).json({ message: 'You must be logged in' })
    }
    if (!post.author.equals(req.user._id)) {
        return res.status(403).json({ message: 'You are dont have permission to do that' })
    }
    next();
}


module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const post = await Blog.findById(id)
    const comment = await Comment.findById(commentId)
    console.log(comment);
    console.log(comment?.author);
    console.log(req.user);
    if (!comment) {
        return res.status(404).json({
            message: 'Comment not found'
        })
    }
    if (!comment.author) {
        return res.status(400).json({
            message: "Comment has no author"
        });
    }
    const isCommentAuthor = comment.author.equals(req.user._id);
    const isPostAuthor = post.author.equals(req.user._id)
    if (!isCommentAuthor && !isPostAuthor) {
        return res.status(403).json({
            message: 'Not authorized'
        })
    }
    next();
}

module.exports.validatePost = (req, res, next) => {
    console.log('this is the req.body', req.body);
    const { error } = postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}
module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}