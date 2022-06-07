const express = require('express')
const { Post } = require('../models/Posts');
const router = express.Router();
const { addNewPost, getAllPosts, updatePost } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// Adds a new post to posts and returns posts from db on get request
router.route('/').get(getAllPosts).post(protect, addNewPost)

router.route('/:id').put(protect, updatePost)

module.exports = router