import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    users: null,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers } = user.actions;

export default user.reducer;
