import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  onlineUsers: [],
  otherUsers: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, setOnlineUsers, setOtherUsers } =
  authSlice.actions;
export default authSlice.reducer;
