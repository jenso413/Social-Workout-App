const express = require('express')
const router = express.Router()
const { addWorkout, addProgram, addExercise, getProgram, getAllPrograms } = require('../controllers/workoutController')
const { upload } = require('../middleware/workoutMiddleware')

router.route('/program').post(addProgram)
router.route('/add-workout').post(addWorkout)
router.route('/exercise').post(addExercise)
router.route('/program/:id').get(getProgram)
router.route('/programs').get(getAllPrograms)


module.exports = router