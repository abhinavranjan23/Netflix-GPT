import React from "react";
import { useSelector } from "react-redux";
import Section from "./MovieCardContainer";

const GptSuggestion = () => {
  const { gptMovieresult, moviename } = useSelector((store) => store.chatgpt);
  if (!gptMovieresult) return;
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-black w-[95vw] px-7  sm:px-14  mt-10 opacity-90 rounded-md '>
        {moviename.map((moviename, index) => (
          <Section title={moviename} data={gptMovieresult[index]} key={index} />
        ))}
      </div>
    </div>
  );
};

export default GptSuggestion;
