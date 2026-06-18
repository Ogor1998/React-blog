const mongoose = require('mongoose')
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    firstname: String,
    lastname: String,
    image: String
}, { timestamps: true })

UserSchema.plugin(passportLocalMongoose.default)
module.exports = mongoose.model('User', UserSchema)

