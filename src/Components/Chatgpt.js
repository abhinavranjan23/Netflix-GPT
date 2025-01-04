import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BACKGROUNDIMAGE } from "../utils/constant";
import GptSuggestion from "./GptSuggestion";

const Chatgpt = () => {
  return (
    <div
      className='min-h-screen bg-repeat bg-top'
      style={{
        backgroundImage: `url(${BACKGROUNDIMAGE})`,
        backgroundSize: "auto",
      }}
    >
      <GptSearchBar />
      <GptSuggestion />
    </div>
  );
};

export default Chatgpt;
