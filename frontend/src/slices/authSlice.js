import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload
            state.userInfo = user;
            localStorage.setItem('userInfo',JSON.stringify(user))
        },
        removeCredentials : (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredentials, removeCredentials} = authSlice.actions;
export default authSlice.reducer;