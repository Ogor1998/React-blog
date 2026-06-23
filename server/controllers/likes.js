const Blog = require('../models/Post')


module.exports.createLike = async (req, res) => {
    const { id } = req.params;
    const post = await Blog.findById(id)
    if (!post) return res.status(404).json({ message: "Post not found" })
    const likes = post.likes || []
    const alreadyLiked = likes.some(
        likeId => likeId.toString() === req.user._id.toString()
    );
    if (alreadyLiked) {
        return res.status(400).json({
            message: "Already Liked"
        })
    }
    post.likes = likes
    post.likes.push(req.user._id);
    await post.save();

    res.json({
        likes: post.likes.length
    })
}

module.exports.deleteLike = async (req, res) => {
    const { id } = req.params;
    const post = await Blog.findById(id)
    if (!post) return res.status(404).json({ message: "Post not found" })
    const likes = post.likes || []
    post.likes = likes.filter(
        likeId => likeId.toString() !== req.user._id.toString()
    );
    await post.save();

    res.json({
        likes: post.likes.length
    })
}


