import { useEffect } from "react";
import { API_OPTIONS, TOP_RATED_API } from "./constant";
import { useDispatch } from "react-redux";
import { addtopRated } from "./moviesSlice";

const useTopMovie = () => {
  const dispatch = useDispatch();
  const toprated = async () => {
    const data = await fetch(TOP_RATED_API, API_OPTIONS);
    const json = await data.json();
    const topMovieResult = json.results;
    dispatch(addtopRated(topMovieResult));
  };
  useEffect(() => {
    toprated();
  }, []);
};
export default useTopMovie;
