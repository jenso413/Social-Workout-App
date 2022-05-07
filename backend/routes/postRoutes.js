const express = require('express')
const Post = require('../models/Posts');
const router = express.Router();
const { addNewPost, getAllPosts } = require('../controllers/postController')

// Adds a new post to posts
router.post('/', addNewPost)

// Returns posts from db on get request
router.get('/', getAllPosts)

module.exports = router