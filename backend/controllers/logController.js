const { Log } = require('../models/Log')
const { User } = require('../models/User')

const logWorkout = async (req, res) => {

    const {userId, workoutName, workoutId, programName, exercises} = req.body
    
    const user = await User.findById(userId)

    const newLog = await new Log({
        workoutName,
        workoutId,
        programName,
    })

    newLog.user = user._id

    for (let exercise of exercises) {
        newLog.exercises.push(exercise)
    }

    if (newLog) {
        await newLog.save()
        console.log(newLog)
        res.status(200).json(newLog)
    } else {
        console.log('Could not save log')
    }
}

module.exports = { logWorkout }