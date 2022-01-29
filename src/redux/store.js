import { configureStore } from "@reduxjs/toolkit";
import user from "./user/userReducer.js";

export default configureStore({
  reducer: {
    user,
  },
});
