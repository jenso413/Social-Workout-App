const express = require('express')
const router = express.Router()
const { addWorkout, addProgram, addExercise, getProgram, getAllPrograms, getProgramMembers } = require('../controllers/workoutController')
const { upload } = require('../middleware/workoutMiddleware')

router.route('/program').post(addProgram)
router.route('/add-workout').post(addWorkout)
router.route('/exercise').post(addExercise)
router.route('/program/:id').get(getProgram)
router.route('/programs').get(getAllPrograms)
router.route('/program/:id/members').get(getProgramMembers)


module.exports = router