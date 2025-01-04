import { createSlice } from "@reduxjs/toolkit";

const chatGptSlice = createSlice({
  name: "chatgpt",
  initialState: {
    value: false,
  },
  reducers: {
    updateGpt: (state, action) => {
      state.value = !state.value;
    },
  },
});
export const { updateGpt } = chatGptSlice.actions;
export default chatGptSlice.reducer;
