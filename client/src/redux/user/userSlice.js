import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
}
//createSlice-A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        //There are three types of actions to call the APIs. Each action has a specific role — send a request to API with a payload (signInRequest), celebrate successful response (signInSuccess), and handle failures (signInFailure).
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
}
})

export const {signInStart,signInSuccess,signInFailure}=userSlice.actions;
export default userSlice.reducer;
