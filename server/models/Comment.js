
const mongoose = require('mongoose')
const { Schema } = mongoose;


const commentSchema = new Schema({
    content: {
        type: String,
        require: [true, 'Comment content is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;