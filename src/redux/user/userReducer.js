import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../models/user/userModel";

export const user = createSlice({
  name: "user",
  initialState: {
    isUserLoading: false,
    isAuth: null,
    isAdmin: false,
    authError: "",
    user: userModel,
  },
  reducers: {
    setUserLoading(state, action) {
      state.isUserLoading = action.payload;
    },
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
    updateUserPhotos(state, action) {
      state.user.photos = action.payload;
    },
    updateUserEmail(state, action) {
      state.user.email = action.payload;
    },
    updateUsername(state, action) {
      state.user.name = action.payload;
    },
    updateColorTheme(state,action) {
      state.user.colorTheme = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setUserAuth,
  setUserAsAdmin,
  setUserAsNotAdmin,
  setUserLoading,
  updateUserPhotos,
  updateUserEmail,
  updateUsername,
  updateColorTheme
} = user.actions;

export default user.reducer;
