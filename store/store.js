import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../featuries/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer
    }
})