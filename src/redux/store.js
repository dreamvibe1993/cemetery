import { configureStore } from "@reduxjs/toolkit";
import graves from "./graves/gravesReducer.js";
import user from "./user/userReducer.js";

export default configureStore({
  reducer: {
    graves,
    user,
  },
});
