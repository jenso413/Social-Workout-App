import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    workoutName: '',
    workoutId: '',
    programName: '',
    exercises: []
}

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