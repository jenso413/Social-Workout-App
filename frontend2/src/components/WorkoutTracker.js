import React, { useState } from 'react'
import Exercise from './Exercise'
import '../css/workoutTracker.css'
import { logWorkoutData } from '../redux/logWorkoutSlice'
import { useDispatch, useSelector } from 'react-redux'

function WorkoutTracker({ workout }) {

    console.log(workout)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user._id)

    const { exercises } = workout 

    const [submitWorkout, setSubmitWorkout] = useState(false)

    // Exercises is an array of exercise objects
    const exerciseList = exercises.map((exercise, index) => {
        return <Exercise key={index} exercise={exercise} submitWorkout={submitWorkout} />
    })

    function logWorkout() {
        // Tells exercise components to submit their data
        setSubmitWorkout(true)

        dispatch(logWorkoutData({
            workoutName : workout.workoutName,
            programName : workout.programName,
            workoutId : workout._id,
            userId,
        }))
    }

    return (
        <>
            <table className='exercise-table'>
                <tbody>
                    <tr>
                        <th>Exercise</th>
                        <th>Weight</th>
                        <th>Reps</th>
                    </tr>
                    {exerciseList}
                </tbody>
            </table>
            <button onClick={logWorkout}>Finished Workout</button>
        </>
    )
}

export default WorkoutTracker