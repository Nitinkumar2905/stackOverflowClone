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
    date: {
        type: Date,
        default: Date.now
    }
})

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;