import React from "react";
import usePopularMovie from "../utils/usePopularMovie";
import { useSelector } from "react-redux";
import useTopMovie from "../utils/useTopRated";
import useTrendingMovie from "../utils/useTrending";
import useUpComingMovie from "../utils/useUpComing";
import usePopularTvShow from "../utils/useTvPopular";
import Section from "./MovieCardContainer";
import lang from "../utils/langConstant";

const SecondConatiner = () => {
  usePopularMovie();
  useTopMovie();
  useTrendingMovie();
  useUpComingMovie();
  usePopularTvShow();
  const movie = useSelector((store) => store.movies);
  const popularTvShow = useSelector((store) => store.tvShow.popularShow);
  const selectedLang = useSelector((store) => store.language.lang);

  return (
    <div className='bg-black w-full  pl-2 sm:pl-14'>
      <Section
        title={lang[selectedLang].titles.topMovie}
        data={movie.toprated}
      />
      <Section
        title={lang[selectedLang].titles.trendingMovie}
        data={movie.trending}
      />
      <Section
        title={lang[selectedLang].titles.upcomingMovie}
        data={movie.upcoming}
      />
      <Section
        title={lang[selectedLang].titles.popularMovie}
        data={movie.popular}
      />
      <Section
        title={lang[selectedLang].titles.popularTvShow}
        data={popularTvShow}
      />
    </div>
  );
};

export default SecondConatiner;
