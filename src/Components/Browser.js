import React from "react";
import Header from "./Header";
import FirstConatiner from "./FirstContainer";
import SecondConatiner from "./SecondConatiner";
import Chatgpt from "./Chatgpt";
import { useSelector } from "react-redux";
const Browser = () => {
  const isChatgpt = useSelector((store) => store.chatgpt.value);
  return (
    <div className=''>
      <Header />
      {isChatgpt ? (
        <Chatgpt />
      ) : (
        <>
          {" "}
          <FirstConatiner />
          <SecondConatiner />
        </>
      )}
    </div>
  );
};

export default Browser;
