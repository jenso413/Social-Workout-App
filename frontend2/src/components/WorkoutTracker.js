import React, { useState } from 'react'
import Exercise from './Exercise'
import '../css/workoutTracker.css'
import { logWorkoutData } from '../redux/logWorkoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { logWorkoutToDB } from '../redux/logWorkoutSlice'

function WorkoutTracker({ workout }) {

    console.log(workout)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user._id)
    const loggedWorkout = useSelector(state => state.logWorkout)

    const { exercises } = workout 

    const [submitWorkout, setSubmitWorkout] = useState(false)

    // Exercises is an array of exercise objects
    const exerciseList = exercises.map((exercise, index) => {
        return <Exercise key={index} exercise={exercise} submitWorkout={submitWorkout} />
    })

    function logWorkoutToRedux() {
        // Tells exercise components to submit their data
        setSubmitWorkout(true)

        dispatch(logWorkoutData({
            workoutName : workout.workoutName,
            programName : workout.programName,
            workoutId : workout._id,
            userId,
        }))

        // Send redux info to server
        // const workoutData = useSelector(state => state.logWorkout)
        // console.log(workoutData)
    }

    function logWorkoutToDB() {
        fetch('/api/log-workout/', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(loggedWorkout)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                incrementStreak()
            })
    }

    function incrementStreak() {
        console.log('incrementing streak...')
        // after clicking submit workout, increment streak
        fetch(`/api/auth/user/${userId}/streak`, {method: 'PATCH'})
            .then(res => res.json())
            .then(data => console.log(data))
        // patch request to backend targeting logged in user
        // increment streak
        // update display automatically (web socket)

        // also: polling at 12:00 am every day
        // if there is not a log from yesterday, streak goes to 0
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
            <button onClick={logWorkoutToRedux}>Finished Workout</button>
            {/* used to be logWorkoutToDB */}
            <button onClick={incrementStreak}>Log Workout</button>
        </>
    )
}

export default WorkoutTracker