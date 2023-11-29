const mongoose = require("mongoose")
const { Schema } = mongoose;

const QuestionAnswerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    },
    userName: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: "Question"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    },
    answerBody: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema)
module.exports = QuestionAnswer;