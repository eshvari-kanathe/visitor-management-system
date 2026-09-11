import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

const savedEmail = localStorage.getItem("userEmail");

const initialState: AuthState = {
  isLoggedIn: savedEmail ? true : false,
  email: savedEmail || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload;

      localStorage.setItem("userEmail", action.payload);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";

      localStorage.removeItem("userEmail");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
