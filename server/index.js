const express = require("express")
const cors = require("cors")
const connectToMongo = require("./db/db")
const port = 8000;

connectToMongo()
const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors(
    {
        origin:["https://stackoverflowclonev2.vercel.app"],
        methods:["POST","GET","DELETE","PUT"],
        credentials:true
    }
))
app.use(express.static("uploads"))

app.get("/", (req, res) => {
    res.json("hello world")
})

// adding routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/questions", require("./routes/question"))

app.listen(port, (req, res) => {
    console.log(`StackOverflow backend running on http://localhost:${port}`);
})