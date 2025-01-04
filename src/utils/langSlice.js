import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: "en",
  },
  reducers: {
    updateLangage: (state, action) => {
      state.lang = action.payload;
    },
  },
});
export const { updateLangage } = languageSlice.actions;
export default languageSlice.reducer;
