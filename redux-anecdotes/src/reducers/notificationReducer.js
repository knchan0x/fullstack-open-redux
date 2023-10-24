import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    cleanMessage() {
      return "";
    },
  },
});

const { setMessage, cleanMessage } = notificationSlice.actions;

export const setNotification = (message, delaySeconds) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(cleanMessage());
    }, delaySeconds * 1000);
  };
};

export default notificationSlice.reducer;
