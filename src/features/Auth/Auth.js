import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthCookies, getAuthCookies, clearAuthCookies } from "../Cookies/CookiesHelper";

// API endpoint
const API_URL = 'http://localhost:5114/api/Auth';
const authCookies = getAuthCookies();

// Thunk để xử lý đăng nhập
export const login = createAsyncThunk('Auth/Login', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setAuthCookies(response.data.userId, response.data.jwtToken); 
      return response.data; // Trả về token từ backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  // Slice quản lý trạng thái auth
  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: authCookies.userID,
      token: authCookies.token,
      isAuthenticated: !!authCookies.token,
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        clearAuthCookies();
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
          state.user = authCookies.userID,
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