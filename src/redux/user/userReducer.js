import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    isAuth: null,
    authError: "",
    user: {},
    isAdmin: false,
  },
  reducers: {
    setUser(state, action) {
      if (action.payload.uid === process.env.REACT_APP_A_UID) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
      action.payload.uid = undefined;
      state.user = action.payload;
    },
    setUserAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserAuth } = user.actions;

export default user.reducer;
