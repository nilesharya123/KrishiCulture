const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, addComment } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public: Get all posts
router.get('/all', getAllPosts);

// Protected: Create post (with optional image)
router.post('/create', protect, upload.single('image'), createPost);

// Protected: Add comment
router.post('/comment/:postId', protect, addComment);

module.exports = router;
