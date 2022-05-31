import React from 'react'
import Exercise from './Exercise'
import '../css/workoutTracker.css'

function WorkoutTracker({ workout }) {

    console.log(workout)

    const { exercises } = workout
    

    // Exercises is an array of exercise objects
    const exerciseList = exercises.map((exercise, index) => {
        return <Exercise key={index} exercise={exercise}/>
    })

    return (
        <table className='exercise-table'>
            <tbody>
                <tr>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </tr>
                {exerciseList}
                {/* <Exercise />
                <Exercise />
                <Exercise />
                <Exercise />
                <Exercise />
                <Exercise />
                <Exercise /> */}
            </tbody>
        </table>
    )
}

export default WorkoutTracker