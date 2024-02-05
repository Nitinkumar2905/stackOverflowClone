const express = require("express")
const User = require("../models/User")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const fetchUser = require("../middleware/fetchUser")
const Question = require("../models/Question")
const QuestionAnswer = require("../models/QuestionAnswer")
const { v4: uuidv4 } = require("uuid")
require("dotenv").config()
const nodemailer = require("nodemailer")
const fs = require("fs");
const crypto = require("crypto")


// multer configuration to upload user profile image 
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, "../uploads/"))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + "-" + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "nimble2905@gmail.com",
//         pass: "Nitin_kumar@2905",
//     }
// })

// Router 1 : create user using post request
router.post("/createUser", [
    body("name", "Enter your name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password should contain atleast 8 characters").isLength({ min: 8 })

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const success = false
        return res.status(401).json({ success, errors: errors.array() })
    }

    // try catch block to handle errors in process
    try {
        // first check whether the user exist or not with provided email
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            const success = false
            return res.status(400).json({ success, error: "User already exists with this email " })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            isVerified: false,
            emailVerificationToken: crypto.randomBytes(64).toString("hex")
        })

        const data = {
            user: {
                id: user.id,
                name: user.name,
            },
        }

        // const verificationLink = `http://localhost:3000/verify-email?token=${user.emailVerificationToken}`
        // const mailOptions = {
        //     from: "nimble2905@gmail.com",
        //     to: user.email,
        //     subject: "Verfiy your email",
        //     text: `Click on the following link to verify the email: ${verificationLink}`
        // }

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return res.status(500).json({ success: false, error: "Failed to send verification email" })
        //     }
        //     res.status(200).json({ success: true, message: "Verification email sent" })
        // })
    

        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        const success = true
        res.json({ success, authToken })
        console.log("Account created successfully");
    } catch (error) {
        console.error(error);
        res.json({ error: "Internal server error" })
    }
})

// Verify email route
// router.get("/verify-email", async (req, res) => {
//     const token = req.query.token;

//     try {
//         const user = await User.findOne({ emailVerificationToken: token })
//         if (!user) {
//             return res.status(404).json({ success: true, error: 'User not found or already verified' })
//         }
//         // update user status in the database
//         user.isVerified = true;
//         user.emailVerificationToken = undefined; //remove the token after verification
//         await user.save();

//         res.status(200).json({ success: true, message: 'email verified successfully' })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json('internal server error')
//     }
// })

// Router 2 : login using provided authentication token 
router.post("/login", [
    body("email", "Enter your email which was used to create account").isEmail(),
    body("password", "Password should contain atleast 8 characters").exists()
], async (req, res) => {
    // if there are bad requests , return errors
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        const success = false
        return res.status().json({ success, errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            const success = false
            return res.status(400).json({ success, error: "User doesn't exits with email", redirectUrl: "/createUser" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            const success = false
            return res.status(400).json("Use correct credentials")
        }

        const data = {
            user: {
                id: user.id,
                name: user.name,
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        const success = true
        res.json({ success, authToken })
        console.log("User logged In successfully");

    } catch (error) {
        console.log(error);
        res.json({ erros: "Internal server error" })
    }
})

// Route 3 : Get logged in user details
router.get("/getUser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("+password")
        // const questionCount = await Question.countDocuments({ user: userId })
        // const userAskedQuestion = await Question.find({ user: userId })
        // const userQuestionAnswered = await QuestionAnswer.find({ user: userId })
        res.send({ user })
        console.log("Fetched user details");
    } catch (error) {
        console.log(error);
        res.send("Internal server error")
    }
})

// route 4: to update user info
router.put("/updateUserName",
    body("name", "Enter your name").isLength({ min: 3 }),
    fetchUser, async (req, res) => {
        try {
            const userId = req.user.id
            const errors = validationResult(req)
            const { name } = req.body
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            // first check whether user exists with this userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(400).json("user not found")
            }
            // const updatedUserName = await User.findByIdAndUpdate(userId, name,{new:true})
            user.name = name
            await user.save()
            res.json({ success: true, user })
        } catch (error) {
            console.error(error);
            return res.status(400).json("Internal server error")
        }
    }
)

// Route 5: get all users info
router.get("/getAllUsers", async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (error) {

    }

})

// route 6: to upload user image
router.post("/uploadImage", fetchUser, upload.single("profileImage"), async (req, res) => {
    try {
        const userId = req.user.id
        const { mimetype } = req.file
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const user = await User.findById(userId);
        user.profileImage = {
            data: req.file.filename,
            contentType: mimetype,
        };
        await user.save();

        console.log("user image is succesfully updated");
        res.send({ success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error")
    }
})

// route 7: to delete user photo
router.delete("/removeImage/:id", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const loggedUserId = req.params.id

        // check if the logged user id matched the route paramter id
        if (!loggedUserId === userId) {
            return res.status(403).json({ error: "Unauthoried access" })
        }

        // find the user with userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json("user not found")
        }


        user.profileImage = null
        await user.save()
        console.log("user image removed successfully!")
        res.json({ success: true })
    } catch (error) {
        console.error(error);
    }
})

// Route 8 : Delete user by userId if logged in
router.delete("/removeUser/:id", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json("User not found")
        }
        await Question.deleteMany({ user })
        // await Question.updateMany({ "votes.userId": userId }, { $pull: { votes: { userId: userId } } })
        await User.findByIdAndDelete(userId)
        await QuestionAnswer.deleteMany({ user })
        return res.json("Account deleted successfully")
    } catch (error) {
        console.log(error);
        return res.json("Internal server error")
    }
})

// Route 9: Send email verification token
module.exports = router;