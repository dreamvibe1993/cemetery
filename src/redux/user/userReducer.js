import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    isUserLoading: false,
    isAuth: false,
    authError: "",
    user: {},
    isAdmin: true,
  },
  reducers: {
    setUser(state, action) {
      /* if (action?.payload?.isAdmin) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      } */
      state.user = action.payload;
    },
    setUserAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserAsAdmin(state) {
      state.isAdmin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserAuth, setUserAsAdmin } = user.actions;

export default user.reducer;
