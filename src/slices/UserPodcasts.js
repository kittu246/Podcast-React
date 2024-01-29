
import { createSlice } from '@reduxjs/toolkit'
import React from 'react'


const initialState = {
    userPodcasts:[],
}

const UserPodcasts = createSlice({
    name:"userPodcasts",
    initialState,
    reducers:{
        setUserPodcasts : (state,action) =>{
            state.userPodcasts = action.payload

        }
    }


}) 

export const{setUserPodcasts} = UserPodcasts.actions;


export default UserPodcasts.reducer