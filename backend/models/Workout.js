const mongoose = require('mongoose')
const { Schema } = mongoose

const workoutSchema = new Schema(
    {
        programName: String,
        exercises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            }
        ]
    }
)

const exerciseSchema = new Schema(
    {
        name: String,
        setCount: {
            type: Number,
            default: 3
        },
        weight: {
            type: Number,
            default: 0
        }
    }
)

const Workout = mongoose.model('Workout', workoutSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)
