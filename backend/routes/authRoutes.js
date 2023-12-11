const express = require('express');
const { registerUser, loginUser, getToken, getUserDetails, updateUser } = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');
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

router.post('/decodeToken', verifyToken, getToken);
router.get('/getUser/:id', getUserDetails);
router.post('/', registerUser);
router.post('/auth', loginUser);
router.put('/updateUser/:id', upload.single('image'), updateUser);

module.exports = router;
