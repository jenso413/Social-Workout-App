import React from 'react'
import '../css/exercise.css'

export default function Exercise({ exercise }) {

    console.log(exercise)
    const { exerciseName, repRange, setCount } = exercise

    const inputArray = []

    for (let i=0; i < setCount; i++) {
        const input = <input key={i}></input>
        inputArray.push(input)
    }
    
    return (
        <tr>
            <td>{exerciseName}</td>
            <td>
                <input placeholder={repRange}></input>
            </td>
            <td >
                <div className='reps-container'>
                    {inputArray}
                </div>
            </td>
        </tr>
    )
}