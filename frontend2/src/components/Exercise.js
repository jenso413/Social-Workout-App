import React from 'react'
import '../css/exercise.css'

export default function Exercise() {
    return (
        <tr>
            <td>Bench Press Machine</td>
            <td>
                <input></input>
            </td>
            <td >
                <div className='reps-container'>
                    <input></input>
                    <input></input>
                    <input></input>
                    <input></input>
                </div>
            </td>
        </tr>
    )
}