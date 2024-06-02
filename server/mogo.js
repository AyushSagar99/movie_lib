const mongoose = require('mongoose');
require('dotenv').config(); 



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
        required: true 
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
