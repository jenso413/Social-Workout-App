import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '', 
    workouts: []
}

const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        addWorkout: (state, action) => {
            state.workouts.push(action.payload)
        }
    }
})

export default programSlice.reducer
export const { addWorkout } = programSlice.actions