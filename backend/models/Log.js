const mongoose = require('mongoose')
const { Schema } = mongoose

const logSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    workoutName: String,
    workoutId: String,
    programName: String,
    exercises: [{
        exerciseName: String,
        weight: Number,
        reps: [Number]
    }],
},
{timestamps: true}
)

const Log = mongoose.model('Log', logSchema)

module.exports = { Log }