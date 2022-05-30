import React, { useEffect, useState } from 'react'
import '../css/logger.css'
import Exercise from './Exercise'
import LoggerHeader from './LoggerHeader'
import Navbar from './Navbar'
import FriendList from './FriendList'
import AddWorkout from './AddWorkout'

export default function Logger() {

    const [addWorkout, setAddWorkout] = useState(false)
    const [workoutName, setWorkoutName] = useState('New Workout')
    const [programName, setProgramName] = useState('Michael')
    const [workoutNameList, setWorkoutNameList] = useState([])

    function displayAddWorkout() {
        setAddWorkout(true)
    }

    function displayLogger() {
        setAddWorkout(false)
    }

    function handleWorkoutNameChange(e) {
        console.log(e)
    }

    // On load, get function to populate dropdown with workout names for chosen community
    // Selected community will be global redux state
    // Program Name it accepts is actually community
    useEffect(() => {
        fetch(`/api/workouts/program/${programName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProgramName(data.programName)
                // Set into redux state? Or maybe just normal state
                data.workouts.forEach(workout => setWorkoutNameList(prevList => [...prevList, workout.workoutName]))
            })
    }, [])

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
                        programName = {programName}
                        workoutNameList={workoutNameList}
                    />

                    {addWorkout ? (<AddWorkout workoutName={workoutName} setWorkoutName={setWorkoutName} programName={programName}/>): 

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