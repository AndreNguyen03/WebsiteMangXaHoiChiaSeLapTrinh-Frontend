import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchWatchedTags } from "../WatchedTags/WatchedTags";

// Define API endpoints
const BASE_URL = "http://localhost:5114/api/Tags";

// Async actions for ignored tags
export const fetchIgnoredTags = createAsyncThunk(
  "ignoredTags/fetchIgnoredTags",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getIgnoredTagByUserId?userId=${userId}`
      );
      const mappedData = response.data.map((tag) => ({
        id: tag.id,
        name: tag.tagname,
      }));
      return mappedData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ignoreTag = createAsyncThunk(
  "ignoredTags/ignoreTag",
  async ({ userId, tagId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(`${BASE_URL}/ignore?userId=${userId}&tagId=${tagId}`);
      // Fetch watched tags to sync data
      //dispatch(fetchWatchedTags(userId));
      return { id: tagId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unignoreTag = createAsyncThunk(
  "ignoredTags/unignoreTag",
  async ({ userId, tagId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `${BASE_URL}/unignore?userId=${userId}&tagId=${tagId}`
      );
      // Fetch watched tags to sync data
      //dispatch(fetchWatchedTags(userId));
      return { id: tagId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for ignored tags
const ignoredTagsSlice = createSlice({
  name: "ignoredTags",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearIgnoredTags: (state) => {
      state.tags = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch ignored tags
      .addCase(fetchIgnoredTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIgnoredTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchIgnoredTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Ignore tag
      .addCase(ignoreTag.fulfilled, (state, action) => {
        // Chỉ thêm tag nếu nó không tồn tại trong danh sách ignoredTags
        if (!state.tags.find((tag) => tag.id === action.payload.id)) {
          const newTag = {
            id: action.payload.id,
            name: action.payload.name || "",
          }; // Đảm bảo `name` được cung cấp
          state.tags.push(newTag);
        }
      })

      .addCase(ignoreTag.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unignore tag
      .addCase(unignoreTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
      })
      .addCase(unignoreTag.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ignoredTagsSlice.reducer;

export const { clearIgnoredTags } = ignoredTagsSlice.actions;
