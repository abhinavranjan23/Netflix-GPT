import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import usePopularMovie from "../utils/usePopularMovie";
import { useSelector } from "react-redux";
import useTopMovie from "../utils/useTopRated";
import useTrendingMovie from "../utils/useTrending";
import useUpComingMovie from "../utils/useUpComing";
import usePopularTvShow from "../utils/useTvPopular";

const SecondConatiner = () => {
  usePopularMovie();
  useTopMovie();
  useTrendingMovie();
  useUpComingMovie();
  usePopularTvShow();

  const popularMovie = useSelector((store) => store.movies.popular);
  const topMovie = useSelector((store) => store.movies.toprated);
  const trendingMovie = useSelector((store) => store.movies.trending);
  const upComingMovie = useSelector((store) => store.movies.upcoming);
  const popularTvShow = useSelector((store) => store.tvShow.popularShow);

  const scrollContainer = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const Section = ({ title, data }) => {
    const containerRef = useRef(null);

    if (!data || data.length === 0) return null;

    return (
      <div className='flex flex-col gap-3 py-4 relative '>
        <h2 className='text-white font-semibold text-lg'>{title}</h2>
        <div
          ref={containerRef}
          className='flex overflow-x-scroll no-scrollbar items-center scroll-smooth'
        >
          <div className='flex gap-4'>
            {data.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        </div>
        {/* Left Button */}
        <button
          onClick={() => scrollContainer(containerRef, -1)}
          className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-60 rounded-full p-1 w-8 h-8 flex items-center justify-center'
        >
          ←
        </button>
        {/* Right Button */}
        <button
          onClick={() => scrollContainer(containerRef, 1)}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-60 rounded-full p-1 w-8 h-8 flex items-center justify-center'
        >
          →
        </button>
      </div>
    );
  };

  return (
    <div className='bg-black w-full pl-14'>
      <Section title='Top Movie' data={topMovie} />
      <Section title='Trending Movie' data={trendingMovie} />
      <Section title='Upcoming Movie' data={upComingMovie} />
      <Section title='Popular Movie' data={popularMovie} />
      <Section title='Popular Tv Show' data={popularTvShow} />
    </div>
  );
};

export default SecondConatiner;
