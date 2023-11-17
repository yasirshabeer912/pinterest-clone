const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  try {
    // Check if the image file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Access the image data from memory
    const image = req.file.buffer;

    // Your image processing logic (e.g., storing in a cloud storage, etc.)

    const postCreate = await Post.create({
      title,
      description,
      image,
    });

    if (postCreate) {
      return res.json({
        message: 'Post created successfully',
        data: postCreate,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.json({ message: 'Post Controller Create' });
});

module.exports = { createPost };
