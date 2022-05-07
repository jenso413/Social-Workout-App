const express = require('express');
const { makeNewUser, validateUserLogin } = require('../controllers/userController');
const router = express.Router();

router.post('/users', makeNewUser)

router.post('/login', validateUserLogin)

module.exports = router;