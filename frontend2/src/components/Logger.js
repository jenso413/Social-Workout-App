import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/logger.css'
import LoggerHeader from './LoggerHeader'
import AddWorkout from './AddWorkout'
import WorkoutTracker from './WorkoutTracker'

export default function Logger() {

    const [addWorkout, setAddWorkout] = useState(true)
    const [workoutName, setWorkoutName] = useState('New Workout')
    const [programName, setProgramName] = useState('Michael')
    const [workoutNameList, setWorkoutNameList] = useState([])
    const [programData, setProgramData] = useState({})
    let test = 0;

    const programId = useSelector(state => state.auth.user.community)

    const [workout, setWorkout] = useState({})

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
        console.log(programId)
        fetch(`/api/workouts/program/${programId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProgramData(data)
                setProgramName(data.programName) 
                // Set into redux state? Or maybe just normal state
                data.workouts.forEach(workout => setWorkoutNameList(prevList => [...prevList, workout.workoutName]))
            })
    }, [test])


    const name = useSelector(state => state.auth.user)
    // console.log(name)
    // console.log(programData)

    // If the click in loggerHeader matches the workout name, display workout data
    function dropdownClick(e) {
        console.log(e.target.innerText)

        const workouts = programData.workouts

        for (let workout of workouts) {
            if (workout.workoutName == e.target.innerText) {
                setWorkout(workout)
            }
        }

        setAddWorkout(false)
    }

    return (
        <div className='container'>
            <LoggerHeader 
                displayAddWorkout={displayAddWorkout}
                displayLogger={displayLogger}
                workoutName={workoutName}
                handleWorkoutNameChange={handleWorkoutNameChange}
                setWorkoutName={setWorkoutName}
                programName = {programName}
                workoutNameList={workoutNameList}
                dropdownClick={dropdownClick}
            />

            {addWorkout ? (<AddWorkout workoutName={workoutName} setWorkoutName={setWorkoutName} programName={programName} test={test}/>): 

            (<WorkoutTracker workout={workout}/>)}
        </div>
    )
}