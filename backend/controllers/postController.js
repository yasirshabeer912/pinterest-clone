const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // Assuming you have an 'image' field in your Post model
  const image = req.file ? req.file.filename : null;

  // Create a new post using the Post model
  const newPost = await Post.create({
    title,
    description,
    image
  })

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost,
  });
});

const getPosts = asyncHandler(async (req, res) => {
  const Posts = await Post.find()
  if (Posts) {
    res.json({ Posts })
  }
})

const getPostByUser = asyncHandler(async (req, res) => {
  // Assuming the user ID is sent in the request parameters
  const userId = req.params.userId;

  // Use Mongoose's find method to get posts by user ID
  const userPosts = await Post.find({ user: userId });

  if (userPosts.length > 0) {
    res.json({
      success: true,
      message: 'Posts retrieved successfully',
      data: userPosts,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'No posts found for the specified user ID',
      data: null,
    });
  }
});

const searchPosts = asyncHandler(async (req, res) =>{
  const searchTerm = req.query.q;

  // Use Mongoose's find method to search for posts
  const searchResults = await Post.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the title
      { description: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the description
    ],
  });
    res.setHeader('Content-Type', 'application/json');

  res.json({
    message: 'Search results retrieved successfully',
    data: searchResults,
  });
})



module.exports = { createPost, getPosts,getPostByUser,searchPosts };
