const { Log } = require('../models/Log')

const logWorkout = async (req, res) => {

    const {userId, workoutName, workoutId, programName, exercises} = req.body
    console.log(exercises)
    

    const newLog = await new Log({
        userId,
        workoutName,
        workoutId,
        programName,
    })

    for (let exercise of exercises) {
        newLog.exercises.push(exercise)
    }

    if (newLog) {
        const log = await newLog.save()
        res.status(200).json(log)
    } else {
        console.log('Could not save log')
    }
}

module.exports = { logWorkout }