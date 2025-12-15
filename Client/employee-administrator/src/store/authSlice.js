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
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
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
