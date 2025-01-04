import React, { useRef, useState } from "react";
import lang from "../utils/langConstant";
import { useSelector } from "react-redux";
import OpenAI from "openai";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.language.lang);
  const [isClicked, setIsClicked] = useState(false);
  const searchRef = useRef();

  const handleGptSearchVal = async () => {
    const message = `act as a movie recommanding system and for the messase ${searchRef.current.value}  show only top 5 movie name and the result should be in single line with comma separeted given result is  and dond show result name only show resultd answer should be like - koi mil gaya, kaho na kaho,om shanti om,krish,jadoo`;
    console.log(searchRef.current.value);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: message }],
    });

    console.log(completion.choices[0].message.content);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleGptSearchVal();
  };

  return (
    <div className='flex justify-center pt-[10%]'>
      <form
        className='grid grid-cols-12 w-2/4 gap-1 bg-black rounded-md'
        onSubmit={handleFormSubmit}
      >
        <input
          ref={searchRef}
          type='text'
          className='col-span-9 m-4 p-4 rounded-md'
          placeholder={lang[selectedLang].searchPlaceholder}
        />
        <button
          className={`bg-red-500 text-white col-span-3 border border-black py-5 m-4 rounded-md transition-transform duration-200 ${
            isClicked ? "scale-95" : "scale-100"
          }`}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
          onMouseLeave={() => setIsClicked(false)}
        >
          {lang[selectedLang].searchButton}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
