const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer to store files in the 'uploads' folder within the 'backend' folder
const uploadFolder = path.join(__dirname, '../uploads/');
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

router.post('/createPost', upload.single('image'), createPost);
router.get('/getPosts', getPosts);

module.exports = router;
