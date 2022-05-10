import React from 'react'
import '../css/logger.css'
import Exercise from './Exercise'

export default function Logger() {
    return (
        <div className='container'>
            <h1>Wendler's 5/3/1</h1>
            <table className='exercise-table'>
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
            </table>
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