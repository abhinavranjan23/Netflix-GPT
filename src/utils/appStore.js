import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice";
import tvShowSlice from "./tvShowSlice";
import chatGptSlice from "./chatGptSlice";
import languageSlice from "./langSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    tvShow: tvShowSlice,
    chatgpt: chatGptSlice,
    language: languageSlice,
  },
});
export default appStore;
