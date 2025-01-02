import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import thư viện jwt-decode
import {
  setAuthCookies,
  getAuthCookies,
  clearAuthCookies,
} from "../Cookies/CookiesHelper";

// API endpoint
const API_URL = "http://localhost:5114/api/Auth";
const authCookies = getAuthCookies();

// Helper function để lấy userRole từ token
const extractUserRole = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return (
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] || null
    ); // Lấy userRole
  } catch (error) {
    return null;
  }
};

// Thunk để xử lý đăng nhập
export const login = createAsyncThunk(
  "Auth/Login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setAuthCookies(response.data.userId, response.data.jwtToken);
      return response.data; // Trả về token từ backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice quản lý trạng thái auth
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: authCookies.userID,
    token: authCookies.token,
    userRole: authCookies.token ? extractUserRole(authCookies.token) : null, // Decode token để lấy userRole
    isAuthenticated: !!authCookies.token,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.isAuthenticated = false;
      clearAuthCookies();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const decodedToken = jwtDecode(action.payload.jwtToken); // Decode token
        state.user = action.payload.userId;
        state.token = action.payload.jwtToken;
        state.userRole =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || null; // Lấy userRole
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
