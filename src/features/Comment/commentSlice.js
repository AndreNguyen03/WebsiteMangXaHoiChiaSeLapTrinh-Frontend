import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch comments for a specific post (question)
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Comment/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return fetched comments data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // Handle errors
    }
  }
);

// Add a comment to a specific post (question)
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, commentText, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/Comment/post/${postId}`,
        { body: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return added comment data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // Handle errors
    }
  }
);

// Initial state for the comments slice
const initialState = {
  comments: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

// The comment slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchComments actions
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; // Set fetched comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set error message
      })
      
      // Handle addComment actions
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload); // Add new comment to the list
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set error message
      });
  },
});

// Export actions and selectors
export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
