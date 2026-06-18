const Blog = require("./models/Post");
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

