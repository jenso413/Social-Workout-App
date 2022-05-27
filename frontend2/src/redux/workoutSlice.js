import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    exercises: []
}

const workoutSlice = createSlice({
    name: 'workout', 
    initialState,
    reducers: {
        addExercise: (state, action) => {
            state.exercises.push(action.payload)
        },
        addWorkoutName: (state, action) => {
            state.name = action.payload
        },
        reset: (state) => initialState
    }
})

export default workoutSlice.reducer
export const { addExercise, addWorkoutName, reset } = workoutSlice.actions
