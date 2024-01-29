import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/UserSlice'
import podcastsReducer from  './slices/PodcastSlice'
export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastsReducer

    }
})