const Joi = require('joi')
module.exports.postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
    category: Joi.string().allow("")
})


module.exports.commentSchema = Joi.object({
    content: Joi.string().required()
})