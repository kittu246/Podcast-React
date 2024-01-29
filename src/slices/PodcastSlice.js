import { createSlice } from '@reduxjs/toolkit'
import React from 'react'


const initialState={
    podcasts:[]
}

const PodcastSlice = createSlice ({
    name:"podcasts",
    initialState,
    reducers:{
        setPodcast:(state,action) =>{

            state.podcasts = action.payload;

        }
    }
}) 

export const {setPodcast} =  PodcastSlice.actions; 
export default PodcastSlice.reducer