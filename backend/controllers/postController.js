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

const getPosts = asyncHandler(async (req,res)=>{
  const Posts = await Post.find()
  if(Posts){
    res.json({Posts})
  }
})

module.exports = { createPost,getPosts };
