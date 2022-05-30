const express = require('express')
const router = express.Router()
const { addWorkout, addProgram, addExercise, getProgram } = require('../controllers/workoutController')

router.route('/program').post(addProgram)
router.route('/add-workout').post(addWorkout)
router.route('/exercise').post(addExercise)
router.route('/program/:name').get(getProgram)


module.exports = router