const mongoose = require('mongoose');

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
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
