const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables



mongoose.connect("mongodb+srv://saggarayush:27dQaNH1lbzzKlYp@cluster0.8rvr6mf.mongodb.net/movies")
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
});

const movieSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // This is causing the error
    },
    movies: [{
        title: String,
        year: String,
        image: String
    }],
    isPrivate:{
        type:Boolean,
        default:true,
    }
});

const User = mongoose.model("User", newSchema);
const movieLib = mongoose.model("MovieLib", movieSchema);
module.exports = {User,movieLib};

// Additional server setup (e.g., express) goes here