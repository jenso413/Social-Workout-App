const { Program, Workout, Exercise } = require('../models/Workout')


// POST: /api/workouts/program
async function addProgram(req, res) {

    console.log(req.body)
    const { programName, pictureUrl, favColor } = req.body

    const newProgram = await new Program({
        programName,
        pictureUrl,
        favColor
    })

    try {
        const program = await newProgram.save()
        res.status(200).json(newProgram)
    } catch (error) {
        res.status(400).json(error)
    }
}

// POST: /api/workouts/add-workout
async function addWorkout(req, res) {
    
    const { workoutName, programName, exerciseList } = req.body

    console.log(exerciseList)

    const newWorkout = await new Workout({
        workoutName,
        programName,
        exercises: exerciseList
    })
    
    try {
        const workout = await newWorkout.save()

        // Add workout to program
        const program = await Program.findOne({ programName: programName})

        if(program) {
            program.workouts.push(workout)
        } else {
            console.log('No program found')
        }
        
        res.status(200).json(program)
    } catch (error) {
        res.status(400).json(error)
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

module.exports = { addProgram, addWorkout, addExercise }