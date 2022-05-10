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
        // <div className='set'>
        //     <h3>Bench Press</h3>
        //     <div className='weight'>
        //         <input className='span-three'></input>
        //     </div>
        //     <div className='reps'>
        //         <input></input>
        //         <input></input>
        //         <input></input>
        //         <input></input>
        //         <input></input>
        //     </div>
        // </div>
    )
}