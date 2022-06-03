const mongoose = require('mongoose')
const { Schema } = mongoose

const exerciseSchema = new Schema(
    {
        exerciseName: String,
        setCount: {
            type: Number,
        },
        repRange: {
            type: String,
        }
    }
)

const workoutSchema = new Schema(
    {
        workoutName: String,
        programName: String,
        exercises: [exerciseSchema]
    }
)

const programSchema = new Schema({
    programName: {
        type: String,
        unique: true
    },
    picture: {
        type: String,
    },
    favColor: String,
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ]
})

const Program = mongoose.model('Program', programSchema)
const Workout = mongoose.model('Workout', workoutSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = { Program, Workout, Exercise }
