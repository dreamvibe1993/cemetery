import { configureStore } from "@reduxjs/toolkit";
import graves from "./graves/gravesReducer.js";
import user from "./user/userReducer.js";
import app from "./app/appReducer.js";

export default configureStore({
  reducer: {
    graves,
    user,
    app,
  },
});
