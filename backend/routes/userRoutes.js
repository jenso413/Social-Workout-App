const express = require('express');
const { registerUser, loginUser, getMe, updateCommunity } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/me', protect, getMe)

router.patch('/user/:id', updateCommunity)

module.exports = router;