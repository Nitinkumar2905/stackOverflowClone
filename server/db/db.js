const mongoose = require("mongoose")
require('dotenv').config()
const mongoURI = process.env.MONGODB_URI

const connectToMongo=async()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected Successfully to MongoDB Database");
    } catch (error) {
        console.error("Error connecting to Mongo ", error.message);
    }
}

module.exports = connectToMongo;