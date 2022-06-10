import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authSlice'
import postReducer from '../redux/postSlice'
import workoutReducer from '../redux/workoutSlice'
import programReducer from '../redux/programSlice'
import logWorkoutReducer from './logWorkoutSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        program: programReducer,
        workout: workoutReducer,
        logWorkout: logWorkoutReducer,
    },
})