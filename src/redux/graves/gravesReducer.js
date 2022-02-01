import { createSlice } from "@reduxjs/toolkit";

export const graves = createSlice({
  name: "graves",
  initialState: {
    graves: [],
  },
  reducers: {
    setGraves(state, action) {
      state.graves = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGraves } = graves.actions;

export default graves.reducer;
