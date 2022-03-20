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
    setNotificationToDefault(state) {
      state.notification = {
        text: null,
        withOptions: false,
        options: ["yes", "no"],
      };
      state.notificationConfirm = null;
    },
  },
});

export const { setNotification, setAnswerToNotif, setNotificationToDefault } =
  app.actions;

export default app.reducer;
