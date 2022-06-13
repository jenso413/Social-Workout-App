const express = require('express')
const { Log } = require('../models/Log')
const { logWorkout } = require('../controllers/logController')
const router = express.Router()

router.route('/').post(logWorkout)

module.exports = router