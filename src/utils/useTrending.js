import { useEffect } from "react";
import { API_OPTIONS, TRENDING_MOVIE_API } from "./constant";
import { useDispatch } from "react-redux";
import { addtrending } from "./moviesSlice";

const useTrendingMovie = () => {
  const dispatch = useDispatch();
  const trending = async () => {
    const data = await fetch(TRENDING_MOVIE_API, API_OPTIONS);
    const json = await data.json();
    const MovieResult = json.results;
    dispatch(addtrending(MovieResult));
  };
  useEffect(() => {
    trending();
  }, []);
};
export default useTrendingMovie;
