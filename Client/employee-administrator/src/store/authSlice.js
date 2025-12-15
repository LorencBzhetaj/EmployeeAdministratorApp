import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userName: null,
  userRole: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    loadUser: (state) => {
      const savedUser = localStorage.getItem("token");
      if (savedUser) state.token = JSON.parse(savedUser);
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
