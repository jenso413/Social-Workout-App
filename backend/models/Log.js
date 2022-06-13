const mongoose = require('mongoose')
const { Schema } = mongoose

const logSchema = new Schema({
    userId: String,
    workoutName: String,
    workoutId: String,
    programName: String,
    exercises: [{
        exerciseName: String,
        weight: Number,
        reps: [Number]
    }],
})

const Log = mongoose.model('Log', logSchema)

module.exports = { Log }