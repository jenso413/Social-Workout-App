import React, { useState } from 'react'
import '../css/exercise.css'

export default function Exercise({ exercise }) {

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