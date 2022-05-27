import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../redux/workoutSlice";

export default function NewExercise() {

    const dispatch = useDispatch()

    const [exerciseInfo, setExerciseInfo] = useState({
        exerciseName: '',
        setCount: 0,
        repRange: 0
    })

    function handleChange(e) {
        setExerciseInfo(prevInfo => ({
            ...prevInfo,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <tr>
            <td>
                <input value={exerciseInfo.exerciseName} name='exerciseName' onChange={handleChange} placeholder='Bench Press'></input>
            </td>
            <td>
                <input value={exerciseInfo.setCount} name='setCount' onChange={handleChange} placeholder='3'></input>
            </td>
            <td >
                <input value={exerciseInfo.repRange} name='repRange' onChange={handleChange} placeholder='8-12'></input>
            </td>
            <td >
                <CheckIcon onClick={() => dispatch(addExercise(exerciseInfo))}/>
            </td>
        </tr>
    )
}