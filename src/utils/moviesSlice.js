import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: [],
    trailer: null,
  },
  reducers: {
    addnowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});
export const { addnowPlaying, addTrailer } = movieSlice.actions;
export default movieSlice.reducer;
