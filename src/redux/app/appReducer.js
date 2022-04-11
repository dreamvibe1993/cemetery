import { createSlice } from "@reduxjs/toolkit";

export const app = createSlice({
  name: "app",
  initialState: {
    notification: {
      text: null,
      withOptions: false,
      options: ["yes", "no"],
      isThereUnsavedData: false,
      type: null
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
    setUnsavedDataStatus(state, action) {
      state.isThereUnsavedData = action.payload;
    },
  },
});

export const {
  setNotification,
  setAnswerToNotif,
  setNotificationToDefault,
  setUnsavedDataStatus,
} = app.actions;

export default app.reducer;
