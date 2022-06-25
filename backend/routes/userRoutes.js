const express = require('express');
const { incrementStreak, registerUser, loginUser, getMe, updateCommunity, getUserByUsername, addFriend, getFriends, removeFriend, updateProfilePic } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/:userId', getMe)

router.post('/friend', addFriend)

router.patch('/friend/:id', removeFriend)

// Not sure why, but wont allow me to run patch to updateProfilePic if this is not commented out
// router.patch('/user/:id', updateCommunity)

router.patch('/user/update', protect, updateProfilePic)

router.get('/user/:username', getUserByUsername)

router.get('/friends/:userId', getFriends)

router.patch('/user/:id/streak', incrementStreak)

module.exports = router;