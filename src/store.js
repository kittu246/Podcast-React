import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/UserSlice'
import podcastsReducer from  './slices/PodcastSlice'
import userPodcastsReducer from './slices/UserPodcasts'
export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastsReducer,
        userPodcasts :userPodcastsReducer

    }
})