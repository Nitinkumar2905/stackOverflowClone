const express = require("express")
const Question = require("../models/Question")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")
const { findById } = require("../models/User")
require("dotenv").config()

// Router 1 to create a question
router.post("/askQuestion", fetchUser, [
    body("QuestionTitle", "Write a suitable title for question").isLength({ min: 1 }),
    body("QuestionDetails", "Explain question in details").isLength({ min: 20 }),
    body("QuestionTriedMethod", "Tell what methods you have tried to solve this problem").isLength({ min: 20 }),
    body("QuestionTags", "tags are related to the question type").exists()
], async (req, res) => {
    try {
        // Destructure property from both model user and body
        const { id: userId, name: userName } = req.user
        const { QuestionTitle, QuestionDetails, QuestionTriedMethod, QuestionTags } = req.body
        // if there are any errors, return bad request and the errors 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }

        const question = new Question({
            QuestionTitle, QuestionDetails, QuestionTriedMethod, QuestionTags, user: userId,
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
router.get("/:id", async (req, res) => {
    const questionId = req.params.id
    try {
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
        console.log(questionId);
        res.status(500).send("Internal server error")
    }
})

module.exports = router