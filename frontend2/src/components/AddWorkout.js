import React, { useEffect, useState } from "react";
import NewExercise from "./NewExercise";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addWorkoutName, reset } from "../redux/workoutSlice";
import { addWorkout } from "../redux/programSlice";
import CheckIcon from '@mui/icons-material/Check';


export default function AddWorkout() {

    const dispatch = useDispatch()
    const fullWorkout = useSelector(state => state.workout)

    const [keyId, setKeyId] = useState(0)
    const [workoutName, setWorkoutName] = useState('')
    const [exerciseList, setExerciseList] = useState([])

    // gives workout name and info
    const workoutInfo = useSelector(state => state.workout)
    
    function addExercise() {
        setKeyId(prevKey => prevKey + 1)
        setExerciseList(prevList => [
            ...prevList,
            <NewExercise key={keyId}/>
        ])
    }

    function submitWorkout() {

        dispatch(addWorkout(fullWorkout))
        
        dispatch(reset())
    
        
    }
    
    function handleName(e) {
        setWorkoutName(e.target.value)
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
                    {exerciseList}
                </tbody>
            </table>
            <AddIcon onClick={addExercise} />
            <button onClick={submitWorkout}>Submit Workout</button>
        </>
    )
}