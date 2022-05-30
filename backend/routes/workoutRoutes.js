const express = require('express')
const router = express.Router()
const { addWorkout, addProgram, addExercise } = require('../controllers/workoutController')

router.route('/program').post(addProgram)
router.route('/add-workout').post(addWorkout)
router.route('/exercise').post(addExercise)


module.exports = router