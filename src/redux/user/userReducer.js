import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    isUserLoading: false,
    isAuth: false,
    authError: "",
    user: {},
    isAdmin: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserAsAdmin(state) {
      state.isAdmin = true;
    },
    setUserAsNotAdmin(state) {
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserAuth, setUserAsAdmin, setUserAsNotAdmin } = user.actions;

export default user.reducer;
