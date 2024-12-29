import { createSlice } from "@reduxjs/toolkit";

const tvShowSlice = createSlice({
  name: "tvShow",
  initialState: {
    popularShow: [],
  },
  reducers: {
    addPopularShow: (state, action) => {
      state.popularShow = action.payload;
    },
  },
});
export const { addPopularShow } = tvShowSlice.actions;
export default tvShowSlice.reducer;
