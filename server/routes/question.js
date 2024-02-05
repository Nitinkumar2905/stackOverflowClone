const express = require("express")
const Question = require("../models/Question")
const QuestionAnswer = require("../models/QuestionAnswer")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")
const e = require("express")
require("dotenv").config()

// Router 1 to create a question
router.post("/askQuestion", fetchUser, [
    body("QuestionTitle", "Write a suitable title for question").isLength({ min: 1 }),
    body("QuestionDetails", "Explain question in details").isLength({ min: 20 }),
    body("QuestionTags", "tags are related to the question type").exists()
], async (req, res) => {
    try {
        // Destructure property from both model user and body
        const { id: userId, name: userName } = req.user
        const { QuestionTitle, QuestionDetails, QuestionTags } = req.body
        // if there are any errors, return bad request and the errors 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }

        const question = new Question({
            QuestionTitle, QuestionDetails, QuestionTags, user: userId,
            userName: userName
        })
        const savedQuestion = await question.save()
        await User.findByIdAndUpdate(userId, { $inc: { questionCount: 1 } })
        res.json(savedQuestion)
        console.log(req.user)
    } catch (error) {
        console.error({ error: error.message });
        res.status(400).send(
            "Internal server error"
        )
    }

})

// router 2: to fetch all question 
router.get("/fetchQuestions", async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }
        const allQuestions = await Question.find()
        res.json(allQuestions)
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})

// router 3: route to particular question page
router.get("/question/:id", async (req, res) => {
    try {
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }
        const question = await Question.findById(questionId)
        if (!question) {
            return res.status(400).json({ error: "question not found" })
        }
        // await question.save()
        res.json({ question })
    } catch (error) {
        console.error(error);
        // console.log(questionId);
        res.status(500).send("Internal server error")
    }
})

// router 4: to answer the question with particular question id
router.post("/question/answer/:id", [
    body("answerBody", "Write your answer for this question").exists()
], fetchUser, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { answerBody } = req.body
        const questionId = req.params.id
        const { id: user, name: userName } = req.user
        const question = await Question.findById(questionId)
        // if logged in user is same as author of the question
        if (question.user.toString() === user) {
            return res.status(400).json("You can't answer the question because you are the author")
        } else {
            if (!question) {
                return res.status(404).json({ errors: "question not found" })
            }
            const answer = new QuestionAnswer({
                answerBody,
                user, userName, questionId
            })
            const savedAnswer = await answer.save()
            await User.findByIdAndUpdate(user, { $inc: { answerCount: 1 } })
            res.json(savedAnswer)
        }
    } catch (error) {
        return res.status(400).json("Internal server error")
    }
})

// router 5: to get question's answer
router.get("/question/getAnswer/:id", async (req, res) => {
    try {
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const answers = await QuestionAnswer.find({ questionId })
        if (!answers || answers.length === 0) {
            return res.status(200).json("no answer found")
        }
        res.json({ answers })
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error")
    }
})

// router 6: up vote question if user is logged in
router.post("/question/upVote/:id", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const question = await Question.findById(questionId)
        // check if the user has already voted for the question
        if (question.upVotes.includes(userId)) {
            // return res.status(400).json({ error: "You have already voted for this question" })
            question.upVotes.pull(userId)
        }
        else {
            // add the user to the upvotes list and if author is not voting for question
            question.upVotes.push(userId)
        }

        // if user has voted down for the question, remove it
        if (question.downVotes.includes(userId)) {
            question.downVotes.pull(userId)
        }
        // if the author tries to vote 
        if (question.user.toString() === userId) {
            return res.status(500).json({ error: "you can't vote as you are the author of the question" })
        }


        // update the vote count
        question.votes = question.upVotes.length - question.downVotes.length

        await question.save()
        res.json({ success: true, votes: question.votes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// router 7: to downvote for a question if user is logged in
router.post("/question/downVote/:id", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const question = await Question.findById(questionId)
        // check if the user has already voted for the question
        if (question.downVotes.includes(userId)) {
            // return res.status(400).json({ error: "You have already voted for this questio" })
            question.downVotes.pull(userId)
        }
        else {
            // add the user to down vote list
            question.downVotes.push(userId)
        }

        // if the user has voted for upvote, remove it 
        if (question.upVotes.includes(userId)) {
            question.upVotes.pull(userId)
        }

        // if the author tries to vote 
        if (question.user.toString() === userId) {
            return res.status(500).json({ error: "you can't vote as you are the author of the question" })
        }

        question.votes = question.upVotes.length - question.downVotes.length

        await question.save()
        res.json({ success: true, votes: question.votes })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// router 8: get total votes for a question from backend
router.get("/question/getVotes/:id", async (req, res) => {
    try {
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const question = await Question.findById(questionId)
        if (!question) {
            return res.status(400).json("question not found")
        }

        const totalVotes = question.votes

        res.json({ success: true, totalVotes: totalVotes })
    } catch (error) {
        console.error(error);
        return res.status(400).json("Internal server error")
    }
})

// router 9: to delete a question and if the logged user is same as author
router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const questionId = req.params.id
        const loggedUserId = req.user.id
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ error: errors.array() })
        }
        const question = await Question.findById(questionId)
        if (question) {
            if (question.user.toString() === loggedUserId) {
                // deleting the question associated with this question id
                await Question.findByIdAndDelete(questionId)
                // deleting multiple answer associated with this question id
                await QuestionAnswer.deleteMany({ questionId })
                await User.findByIdAndUpdate(userId, { $inc: { questionCount: -1 } })
                res.json({ message: "Question deleted successfully" })
            }
            else {
                return res.status(403).json("cant delete this question as you are not author of this question")
            }
        }
        else {
            return res.status(404).json("question not found")
        }

    } catch (error) {
        console.error(error);
    }
})

router.post("/savePost", fetchUser, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const questionId = req.params.id
        const loggedUserId = req.user.id
        
    } catch (error) {

    }
})

module.exports = router