import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'))

const inititalState = {
    user: user ? user : null,
    isError: null,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: () => { }
})

export const { reset } = authSlice.actions
export default authSlice.reducer