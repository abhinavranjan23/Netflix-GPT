import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BACKGROUNDIMAGE } from "../utils/constant";

const Chatgpt = () => {
  return (
    <div>
      <div className='-z-10 absolute'>
        <img src={BACKGROUNDIMAGE} className='-z-10' />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default Chatgpt;
