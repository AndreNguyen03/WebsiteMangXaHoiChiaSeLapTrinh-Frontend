import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API endpoint
const API_URL = 'http://localhost:5000/api/auth';

// Thunk để xử lý đăng nhập
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/Login`, credentials);
      return response.data; // Trả về token từ backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  // Slice quản lý trạng thái auth
  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null, // Thông tin người dùng
      token: null, // JWT token
      isAuthenticated: false,
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;