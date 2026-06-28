const Joi = require('joi')
module.exports.postSchema = Joi.object({
    posts: Joi.object({
        title: Joi.string().required(),
        content: Joi.string(),
        title: Joi.string(),
    })
})


module.exports.commentSchema = Joi.object({
    content: Joi.string().required()

})