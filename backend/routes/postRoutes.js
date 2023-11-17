const express = require('express');
const { createPost } = require('../controllers/postController');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

router.post('/createPost', upload.single('image'), createPost);

module.exports = router;
