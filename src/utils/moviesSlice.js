import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: [],
    trailer: null,
    popular: [],
    toprated: [],
    trending: [],
    upcoming: [],
  },
  reducers: {
    addnowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addpopular: (state, action) => {
      state.popular = action.payload;
    },
    addtopRated: (state, action) => {
      state.toprated = action.payload;
    },
    addtrending: (state, action) => {
      state.trending = action.payload;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
  },
});
export const {
  addnowPlaying,
  addTrailer,
  addpopular,
  addtopRated,
  addtrending,
  addUpcoming,
} = movieSlice.actions;
export default movieSlice.reducer;
