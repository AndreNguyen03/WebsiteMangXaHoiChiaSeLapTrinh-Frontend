import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API endpoints
const BASE_URL = "http://localhost:5114/api/Tags";

// Async actions
export const fetchWatchedTags = createAsyncThunk(
  "watchedTags/fetchWatchedTags",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getWatchedTagByUserId?userId=${userId}`
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

export const watchTag = createAsyncThunk(
  "watchedTags/watchTag",
  async ({ userId, tagId }, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/watch?userId=${userId}&tagId=${tagId}`);
      return { id: tagId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unwatchTag = createAsyncThunk(
  "watchedTags/unwatchTag",
  async ({ userId, tagId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/unwatch?userId=${userId}&tagId=${tagId}`);
      return { id: tagId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const watchedTagsSlice = createSlice({
  name: "watchedTags",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWatchedTags: (state) => {
      state.tags = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch watched tags
      .addCase(fetchWatchedTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchedTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchWatchedTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Watch tag
      .addCase(watchTag.fulfilled, (state, action) => {
        // Thêm tag vào danh sách nếu chưa tồn tại
        if (!state.tags.find((tag) => tag.id === action.payload.id)) {
          state.tags.push(action.payload);
        }
      })
      .addCase(watchTag.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unwatch tag
      .addCase(unwatchTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
      })
      .addCase(unwatchTag.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default watchedTagsSlice.reducer;

export const { clearWatchedTags } = watchedTagsSlice.actions;
