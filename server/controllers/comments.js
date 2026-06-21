const Comment = require('../models/Comment')
const Blog = require('../models/Post')



module.exports.createComment = async (req, res) => {
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
}


module.exports.deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
    console.log("Deleted comment")
    res.json({ message: 'Comment deleted' })
}