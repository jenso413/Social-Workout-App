import React, { useEffect, useState, useRef } from 'react'
import '../css/logger.css'
import Exercise from './Exercise'
import LoggerHeader from './LoggerHeader'
import Navbar from './Navbar'
import FriendList from './FriendList'
import AddWorkout from './AddWorkout'

export default function Logger() {

    const [addWorkout, setAddWorkout] = useState(false)
    const [workoutName, setWorkoutName] = useState('New Workout')

    function displayAddWorkout() {
        setAddWorkout(true)
    }

    function displayLogger() {
        setAddWorkout(false)
    }

    function handleWorkoutNameChange(e) {
        console.log(e)
    }

    return (
        <div className='main'>
            <Navbar />
            <div className='body'>
                <FriendList />
                <div className='container'>
                    <LoggerHeader 
                        displayAddWorkout={displayAddWorkout}
                        displayLogger={displayLogger}
                        workoutName={workoutName}
                        handleWorkoutNameChange={handleWorkoutNameChange}
                        setWorkoutName={setWorkoutName}
                    />

                    {addWorkout ? (<AddWorkout />): 

                    (<table className='exercise-table'>
                        <tbody>
                            <tr>
                                <th>Exercise</th>
                                <th>Weight</th>
                                <th>Reps</th>
                            </tr>
                            <Exercise />
                            <Exercise />
                            <Exercise />
                            <Exercise />
                            <Exercise />
                            <Exercise />
                            <Exercise />
                        </tbody>
                    </table>)}
                </div>
            </div>
        </div>
    )
}