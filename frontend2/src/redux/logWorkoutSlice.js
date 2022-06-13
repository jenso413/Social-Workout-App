import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    userId: '',
    workoutName: '',
    workoutId: '',
    programName: '',
    exercises: []
}

export const logWorkoutToDB = createAsyncThunk('/workout/log', async (thunkAPI) => {
    try {   
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify()
        })
    } catch (error) {
        console.log(error)
    }
})

const logWorkoutSlice = createSlice({
    name: 'logWorkout', 
    initialState,
    reducers: {
        logExercise: (state, action) => {
            state.exercises.push(action.payload)
        },
        logWorkoutData: (state, action) => {
            state.userId = action.payload.userId
            state.workoutName = action.payload.workoutName
            state.workoutId = action.payload.workoutId
            state.programName = action.payload.programName
        },
        reset: (state) => initialState
    }
})

export default logWorkoutSlice.reducer
export const { logExercise, logWorkoutData, reset } = logWorkoutSlice.actions