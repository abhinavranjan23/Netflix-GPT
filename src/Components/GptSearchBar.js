import React, { useRef, useState } from "react";
import lang from "../utils/langConstant";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { updateGptMovieResult } from "../utils/chatGptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.language.lang);
  const [isClicked, setIsClicked] = useState(false);
  const searchRef = useRef();
  const dispatch = useDispatch();

  const serachTmdbMovie = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchVal = async () => {
    const message = `act as a movie recommending system and for the message ${searchRef.current.value} show only top 5 movie names, and the result should be in a single line with comma-separated movie names. The result should be: koi mil gaya, kaho na kaho, om shanti om, krish, jadoo`;
    console.log(searchRef.current.value);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: message }],
    });

    const gptMovieList = completion.choices[0].message.content.split(",");
    console.log(gptMovieList);
    const promiseArray = gptMovieList.map((movie) => serachTmdbMovie(movie));
    const tmdbResult = await Promise.all(promiseArray);
    console.log(tmdbResult);
    dispatch(
      updateGptMovieResult({ moviename: gptMovieList, movieresult: tmdbResult })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleGptSearchVal();
  };

  return (
    <div className='flex justify-center pt-[20%]  sm:pt-[10%] px-4 sm:px-0'>
      <form
        className='grid grid-cols-12 gap-1 p-2 sm:p-4 bg-black rounded-md w-full sm:w-2/4'
        onSubmit={handleFormSubmit}
      >
        <input
          ref={searchRef}
          type='text'
          className='col-span-12 sm:col-span-9 m-4 p-4 rounded-md text-sm sm:text-base'
          placeholder={lang[selectedLang].searchPlaceholder}
        />
        <button
          className={`bg-red-500 text-white col-span-12 sm:col-span-3 border border-black py-4 sm:py-5 m-4 rounded-md transition-transform duration-200 ${
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
