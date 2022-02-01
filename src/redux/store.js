import { configureStore } from "@reduxjs/toolkit";
import graves from "./graves/gravesReducer.js";

export default configureStore({
  reducer: {
    graves,
  },
});
