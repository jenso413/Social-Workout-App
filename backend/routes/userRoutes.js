const express = require('express');
const { incrementStreak, registerUser, loginUser, getMe, updateCommunity, getUserByUsername, addFriend, getFriends, removeFriend } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/me', protect, getMe)

router.post('/friend', addFriend)

router.patch('/friend/:id', removeFriend)

router.patch('/user/:id', updateCommunity)

router.get('/user/:username', getUserByUsername)

router.get('/friends/:userId', getFriends)

router.patch('/user/:id/streak', incrementStreak)

module.exports = router;