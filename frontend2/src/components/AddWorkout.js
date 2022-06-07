import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";


export default function AddWorkout({ workoutName, programName, test}) {

    const newExercise = {
        exerciseName: '',
        setCount: '',
        repRange: ''
    }

    const [exerciseList, setExerciseList] = useState([])
    
    function addExercise() {
        setExerciseList(prevList => [
            ...prevList,
            newExercise
        ])
    }

    function submitWorkout() {

        addToServer()

        setExerciseList([])

        test++
    }

    function addToServer() {

        // Adds workout to DB
        // Automatically adds workout reference to program that is used with programName
        fetch('/api/workouts/add-workout', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                workoutName,
                programName,
                exerciseList,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    // PRETTY SIMPLE CHANGE TO AN INSANELY COMPLEX PROBLEM, TOOK ME SO LONG TO SOLVE LETS GOOO
    function onChange(e, index) {
        setExerciseList(prevState => {
            return prevState.map(exercise => exercise == prevState[index] ? {...exercise, [e.target.name] : e.target.value } : exercise)
        })
    }

    return (
        <>
            <table className='exercise-table'>
                <tbody>
                    <tr>
                        <th>Exercise</th>
                        <th># of Sets</th>
                        <th>Rep Range</th>
                    </tr>
                    {/* <NewExercise key={keyId} id={keyId} exerciseInfo={exerciseInfo} handleExerciseInfo={handleExerciseInfo}/> */}
                    {exerciseList.map((exercise, index) => {
                        return <tr key={index}>
                            <td>
                                <input value={exercise.exerciseName} name='exerciseName' onChange={e => onChange(e, index)} placeholder='Bench Press' required></input>
                            </td>
                            <td>
                                <input type='number' min='1' max='10' value={exercise.setCount} name='setCount' onChange={e => onChange(e, index)} placeholder='3' required></input>
                            </td>
                            <td >
                                <input value={exercise.repRange} name='repRange' onChange={e => onChange(e, index)} placeholder='8-12' required></input>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <AddIcon onClick={addExercise} />
            <button onClick={submitWorkout}>Submit Workout</button>
        </>
    )
}