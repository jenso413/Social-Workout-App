const { User } = require('../models/User')
const { Program, Workout, Exercise } = require('../models/Workout')

// POST: /api/workouts/program
async function addProgram(req, res) {

    console.log(req.body)
    const { programName, favColor, picture } = req.body

    const programExists = await Program.findOne({programName})

    if (programExists) {
        return res.status(409).json("Program Name already exists")
    }

    const newProgram = await new Program({
        programName,
        picture,
        favColor
    })

    try {
        const program = await newProgram.save()
        res.status(200).json(program)
    } catch (error) {
        res.status(400).json(error)
    }
}

// POST: /api/workouts/add-workout
async function addWorkout(req, res) {
    
    const { workoutName, programName, exerciseList } = req.body

    console.log(req.body)

    const newWorkout = await new Workout({
        workoutName,
        programName,
        exercises: exerciseList
    })
    
    
        const workout = await newWorkout.save()
        console.log(workout.id)

        // Add workout to program
        const program = await Program.findOne({ programName: programName})

        if (program) {
            program.workouts.push(workout.id)
            program.save()
            res.status(200).json(program)
        } else {
            res.status(400).json("No program found")
        }
        
}

async function addExercise(req, res) {

    const { exerciseName, setCount, repRange } = req.body

    const newExercise = await new Exercise({
        exerciseName,
        setCount, 
        repRange
    })

    try {
        const exercise = await newExercise.save()
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json(error)
    }
}

// GET: /api/workouts/program/:id
async function getProgram(req, res) {

    // Gets program name passed into request url
    const programId = req.params.id
    console.log(programId)

    const program = await Program.findOne({_id : programId}).populate('workouts')

    if (program) {
        res.status(200).json(program)
    } else {    
        console.log('Unable to find program')
    }
}

// GET: http://localhost:3001/api/workouts/programs
async function getAllPrograms(req, res) {
    const programs = await Program.find({})

    if (programs) {
        res.status(200).json(programs)
    } else {
        console.log('Unable to fetch programs')
    }
}

// GET: /api/workouts/program/:id/members'
async function getProgramMembers(req, res) {
    // program Id
    const programId = req.params.id
    console.log(programId)

    const programMembers = await User.find({community : programId})

    if (programMembers) {
        res.status(200).json(programMembers)
    } else {
        res.status(404).json('No program members found')
    }
    
    
}

module.exports = { addProgram, addWorkout, addExercise, getProgram, getAllPrograms, getProgramMembers }