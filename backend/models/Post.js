const mongoose = require('mongoose');

// Define the user schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
});

// Create the user model
const User = mongoose.model('Post', postSchema);

module.exports = User;
