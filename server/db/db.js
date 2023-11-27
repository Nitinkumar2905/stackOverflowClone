const mongoose = require("mongoose")
const mongoURI = "mongodb+srv://nimble2905:stackOverflow@cluster0.90gq1ut.mongodb.net/stackOverflow?retryWrites=true&w=majority"

const connectToMongo=async()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected Successfully to MongoDB Database");
    } catch (error) {
        console.error("Error connecting to Mongo ", error.message);
    }
}

module.exports = connectToMongo;