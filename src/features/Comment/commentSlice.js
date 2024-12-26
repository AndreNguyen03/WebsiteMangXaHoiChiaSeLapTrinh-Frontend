// src/features/Comment/commentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; // Import the axios instance with interceptors

// Action to fetch comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (questionId) => {
    const response = await axiosInstance.get(`/Comment/post/${questionId}`);
    return response.data; // Return the fetched comments
  }
);

// Action to add a comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ questionId, commentText }) => {
    const response = await axiosInstance.post(`/Comment/post/${questionId}`, {
      text: commentText,
    });
    return response.data; // Return the newly added comment
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchComments action
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; // Set the fetched comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handling addComment action
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload); // Add the new comment to the list
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
