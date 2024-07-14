import { createSlice } from "@reduxjs/toolkit";

const initialPosts = []

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: initialPosts },
  reducers: {
    fetchPost: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((p) => p.id !== payload);
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((p) => (p.id === payload.id ? payload : p));
    },
  },
});

export const {addPost, deletePost, editPost, fetchPost} = postsSlice.actions
export default postsSlice.reducer