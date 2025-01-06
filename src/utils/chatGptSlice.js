import { createSlice } from "@reduxjs/toolkit";

const chatGptSlice = createSlice({
  name: "chatgpt",
  initialState: {
    value: false,
    moviename: null,
    gptMovieresult: null,
  },
  reducers: {
    updateGpt: (state, action) => {
      state.value = !state.value;
    },
    updateGptMovieResult: (state, action) => {
      const { moviename, movieresult } = action.payload;
      state.moviename = moviename;
      state.gptMovieresult = movieresult;
    },
    removeGptMovieResult: (state) => {
      state.moviename = null;
      state.gptMovieresult = null;
    },
  },
});
export const { updateGpt, updateGptMovieResult, removeGptMovieResult } =
  chatGptSlice.actions;
export default chatGptSlice.reducer;
