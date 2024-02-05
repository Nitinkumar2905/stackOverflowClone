const mongoose = require("mongoose")
const { Schema } = mongoose

const QuestionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userName: {
        type: mongoose.Schema.Types.String,
        ref: "User"
    },
    QuestionTitle: {
        type: String,
        required: true
    },
    QuestionDetails: {
        type: String,
        required: true
    },
    QuestionTags: {
        type: [String],
        required: true
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to user model
    }],
    votes: {
        type: Number,
        default: 0
    },
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to user model
    }],
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: String,
        default: false
    }
})

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;