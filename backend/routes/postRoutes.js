const express = require('express');
const { createPost, getPosts,getPostByUser,searchPosts,savedPost,getSavedPost } = require('../controllers/postController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');
// Set up multer to store files in the 'uploads' folder within the 'backend' folder
const uploadFolder = path.join(__dirname, '../tmp');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Get the current timestamp
    const filename = `${timestamp}_${file.originalname}`; // Add timestamp to the original filename
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post('/createPost',verifyToken, upload.single('image'), createPost);
router.get('/getPosts', getPosts);
router.get('/getPostsByUser/:id', verifyToken, getPostByUser); // Corrected order
router.post('/search', searchPosts);
router.post('/savePosts/:id', verifyToken, savedPost);
router.get('/getSavedPosts/:id', verifyToken, getSavedPost);

module.exports = router;
