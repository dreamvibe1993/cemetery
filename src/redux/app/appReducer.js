import { createSlice } from "@reduxjs/toolkit";

export const app = createSlice({
  name: "app",
  initialState: {
    notification: {
      text: null,
      withOptions: false,
      options: ["yes", "no"],
    },
    notificationConfirm: null,
  },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setAnswerToNotif(state, action) {
      state.notificationConfirm = action.payload;
    },
  },
});

export const { setNotification, setAnswerToNotif } = app.actions;

export default app.reducer;
