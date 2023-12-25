const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
    profileImage: {
        data: String,
        contentType: String,
        // default: null
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    // emailVerificationToken: {
    //     type: String,
    // },
    questionCount: {
        type: Number,
        required: true,
        default: 0
    },
    answerCount: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;