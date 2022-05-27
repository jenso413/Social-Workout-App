import React, { useEffect, useState } from 'react'
import '../css/logger.css'
import AddWorkout from './AddWorkout'
import Exercise from './Exercise'

export default function Logger() {

    const [addWorkout, setAddWorkout] = useState(false)
    
    function onClick() {
        setAddWorkout(true)
    }

    return (
        // Have an example, starter workout
        // Everyone is part of it at first
        // Called 'IRON Workout'
        <div className='container'>
            {addWorkout ? (<AddWorkout />) : 
        
            (<div className='default'>
                <h1>Wendler's 5/3/1</h1>
                <button onClick={onClick}>Add workout</button>
                <table className='exercise-table'>
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
                </table>
            </div>)}
            
        </div>
        // <div className='logger'>
        //     <h1>Wendler's 5/3/1</h1>
        //     <div className='grid'>
        //         <Set />
        //         <Set />
        //         <Set />
        //         <Set />
        //         <Set />
        //         <Set />
        //     </div>
        // </div>
    )
}