const express = require("express")
const Question = require("../models/Question")
const QuestionAnswer = require("../models/QuestionAnswer")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")
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
            res.json(savedAnswer)
        }
    } catch (error) {
        return res.status(400).json("Internal server error")
    }
})

// router to get question's answer
router.get("/question/getAnswer/:id", async (req, res) => {
    try {
        const questionId = req.params.id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const answers = await QuestionAnswer.find({questionId})
        if (!answers || answers.length===0) {
            return res.status(404).json("no answer found for this question")
        }
        res.json({ answers })
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error")
    }
})

// router 6: to delete a question and if the logged user is same as author
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

module.exports = router