const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Ensure MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000 // 45 seconds
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

const User = mongoose.model("User", newSchema);
module.exports = User;

// Additional server setup (e.g., express) goes here
