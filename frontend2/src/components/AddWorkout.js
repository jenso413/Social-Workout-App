import React, { useEffect, useRef, useState } from "react";
import NewExercise from "./NewExercise";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addWorkoutName, reset } from "../redux/workoutSlice";
import programSlice, { addWorkout } from "../redux/programSlice";
import CheckIcon from '@mui/icons-material/Check';


export default function AddWorkout() {

    const dispatch = useDispatch()
    const programName = useSelector(state => state.program.name)

    const newExercise = {
        exerciseName: '',
        setCount: '',
        repRange: ''
    }

    const [workoutName, setWorkoutName] = useState('')
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
    
    function handleName(e) {
        setWorkoutName(e.target.value)
    }

    // PRETTY SIMPLE CHANGE TO AN INSANELY COMPLEX PROBLEM, TOOK ME SO LONG TO SOLVE LETS GOOO
    function onChange(e, index) {
        setExerciseList(prevState => {
            return prevState.map(exercise => exercise == prevState[index] ? {...exercise, [e.target.name] : e.target.value } : exercise)
        })
    }

    return (
        <>
            <input placeholder='Enter workout name' onChange={handleName} value={workoutName}></input>
            <CheckIcon onClick={() => dispatch(addWorkoutName(workoutName))}/>
            <table className='exercise-table'>
                <tbody>
                    <tr>
                        <th>Exercise</th>
                        <th># of Sets</th>
                        <th>Rep Range</th>
                        <th>Lock</th>
                    </tr>
                    {/* <NewExercise key={keyId} id={keyId} exerciseInfo={exerciseInfo} handleExerciseInfo={handleExerciseInfo}/> */}
                    {exerciseList.map((exercise, index) => {
                        return <tr key={index}>
                            <td>
                                <input value={exercise.exerciseName} name='exerciseName' onChange={e => onChange(e, index)} placeholder='Bench Press'></input>
                            </td>
                            <td>
                                <input value={exercise.setCount} name='setCount' onChange={e => onChange(e, index)} placeholder='3'></input>
                            </td>
                            <td >
                                <input value={exercise.repRange} name='repRange' onChange={e => onChange(e, index)} placeholder='8-12'></input>
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