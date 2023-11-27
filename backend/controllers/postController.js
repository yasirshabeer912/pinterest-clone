const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');
const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // Assuming you have an 'image' field in your Post model
  const image = req.file ? req.file.filename : null;

  // Create a new post using the Post model
  const owner = req.userId; // Updated line
  // console.log('owner of this post is ', owner);
  const newPostData = {
    title,
    description,
    image,
    owner

  }
  const post = await Post.create(newPostData);
  const user = await User.findById(owner);
  console.log('User in Created Post:', user);


  user.posts.push(post._id);

  await user.save();
  console.log('User saved successfully');
  

  res.status(201).json({
    message: 'Post created successfully',
    data: newPostData,
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
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find posts associated with the user and populate the owner field
    // Find posts associated with the user and populate the owner field
    const posts = await Post.find({ owner: userId })
      .populate({
        path: 'owner',
        select: '_id title description image', // Specify the fields you want to include
      });
    res.status(200).json({
      message: 'Posts retrieved successfully',
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



const searchPosts = asyncHandler(async (req, res) => {
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


const savedPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId; // Assuming you have a middleware that sets userId in the request

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the post with the given postId exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post is already saved by the user
    const isSaved = user.saved.includes(postId);

    if (isSaved) {
      // Remove the post from the user's saved list
      user.saved = user.saved.filter(savedPostId => savedPostId.toString() !== postId);
      await user.save();

      return res.status(200).json({
        message: 'Post removed from saved list',
        data: {
          user: user,
          post: post,
        },
      });
    } else {
      // Save the post to the user's saved list
      user.saved.push(postId);
      await user.save();

      return res.status(201).json({
        message: 'Post saved successfully',
        data: {
          user: user,
          post: post,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getSavedPost = asyncHandler(async (req, res) => {
  // Assuming the user ID is sent in the request parameters
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find posts that are in the user's saved list and populate the owner field
    const savedPosts = await Post.find({ _id: { $in: user.saved } })
      .populate({
        path: 'owner',
        select: '_id title description image', // Specify the fields you want to include
      });

    res.status(200).json({
      message: 'Saved Posts retrieved successfully',
      savedPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = { createPost, getPosts, getPostByUser, searchPosts, savedPost,getSavedPost };

