import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import '../css/exercise.css'
import { logExercise } from '../redux/logWorkoutSlice'

export default function Exercise({ exercise, submitWorkout }) {

    const dispatch = useDispatch()
    const inputArray = []
    const { exerciseName, repRange, setCount } = exercise

    // Create x inputs depending on setCount
    for (let i=0; i < setCount; i++) {
        const input = <input key={i} type='number' name='reps' placeholder={repRange} onChange={handleChange} index={i}></input>
        inputArray.push(input)
    }

    const initialExerciseData = {
        exerciseName,
        weight: '',
        reps: Array(inputArray.length).fill(0)
    }

    const [exerciseData, setExerciseData] = useState(initialExerciseData)

    const isFirstRun = useRef(true)

    useEffect(() => {
        // To ignore first render
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        } else {
            console.log('hi')
            dispatch(logExercise(exerciseData))
        }
    }, [submitWorkout])

    function handleChange(e) {
        switch (e.target.name) {
            case 'weight' :
                setExerciseData(prevState => ({
                    ...prevState,
                    weight : parseInt(e.target.value)
                }))
                break;
            case 'reps' :
                const inputIndex = e.target.getAttribute('index')
                setExerciseData(prevState => ({
                        ...prevState,
                        // Map each rep input to its respective place in the state rep array (maintains order)
                        reps: prevState.reps.map((rep, index) => index == inputIndex ? parseInt(e.target.value) : rep)
                }))
        }
        
    }
    
    return (
        <tr>
            <td>{exerciseName}</td>
            <td>
                <input name='weight' type='number' onChange={handleChange} value={exerciseData.weight}></input>
            </td>
            <td >
                <div className='reps-container'>
                    {inputArray}
                </div>
            </td>
        </tr>
    )
}