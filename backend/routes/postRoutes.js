const express = require('express');
const { createPost, getPosts,getPostByUser,searchPosts,savedPost,getSavedPost } = require('../controllers/postController');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/createPost',verifyToken, createPost);
router.get('/getPosts', getPosts);
router.get('/getPostsByUser/:id', verifyToken, getPostByUser); // Corrected order
router.post('/search', searchPosts);
router.post('/savePosts/:id', verifyToken, savedPost);
router.get('/getSavedPosts/:id', verifyToken, getSavedPost);

module.exports = router;
