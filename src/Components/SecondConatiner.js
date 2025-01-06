import React from "react";
import usePopularMovie from "../utils/usePopularMovie";
import { useSelector } from "react-redux";
import useTopMovie from "../utils/useTopRated";
import useTrendingMovie from "../utils/useTrending";
import useUpComingMovie from "../utils/useUpComing";
import usePopularTvShow from "../utils/useTvPopular";
import Section from "./MovieCardContainer";

const SecondConatiner = () => {
  usePopularMovie();
  useTopMovie();
  useTrendingMovie();
  useUpComingMovie();
  usePopularTvShow();
  const movie = useSelector((store) => store.movies);
  const popularTvShow = useSelector((store) => store.tvShow.popularShow);

  return (
    <div className='bg-black w-full  pl-2 sm:pl-14'>
      <Section title='Top Movie' data={movie.toprated} />
      <Section title='Trending Movie' data={movie.trending} />
      <Section title='Upcoming Movie' data={movie.upcoming} />
      <Section title='Popular Movie' data={movie.popular} />
      <Section title='Popular Tv Show' data={popularTvShow} />
    </div>
  );
};

export default SecondConatiner;
