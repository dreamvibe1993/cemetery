import { createSlice } from "@reduxjs/toolkit";

export const graves = createSlice({
  name: "graves",
  initialState: {
    graves: [],
    isGravesLoading: false,
  },
  reducers: {
    setGraves(state, action) {
      state.graves = action.payload;
    },
    setGravesLoadingStart(state) {
      state.isGravesLoading = true;
    },
    setGravesLoadingOver(state) {
      state.isGravesLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGraves, setGravesLoadingStart, setGravesLoadingOver } =
  graves.actions;

export default graves.reducer;
