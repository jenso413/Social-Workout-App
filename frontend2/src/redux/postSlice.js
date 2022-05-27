import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from './postService'

const convertToDate = (timestamp) => {
    console.log(timestamp)
}

const initialState = {
    postsArray: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createPost = createAsyncThunk('user/posts',  async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const res = await postService.createPost(postData, token)
        return res
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.postsArray.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export default postSlice.reducer
export const { reset } = postSlice.actions