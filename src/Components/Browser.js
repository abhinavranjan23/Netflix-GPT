import React from "react";
import Header from "./Header";
import FirstConatiner from "./FirstContainer";
import { useNowPlaying } from "../utils/useNowPlaying";
const Browser = () => {
  // useNowPlaying();
  return (
    <div>
      <Header />
      <FirstConatiner />
    </div>
  );
};

export default Browser;
