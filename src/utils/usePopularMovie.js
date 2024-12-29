import { useEffect } from "react";
import { API_OPTIONS, POPULAR_API } from "./constant";
import { useDispatch } from "react-redux";
import { addpopular } from "./moviesSlice";

const usePopularMovie = () => {
  const dispatch = useDispatch();
  const popular = async () => {
    const data = await fetch(POPULAR_API, API_OPTIONS);
    const json = await data.json();
    const popularResult = json.results;
    dispatch(addpopular(popularResult));
  };
  useEffect(() => {
    popular();
  }, []);
};
export default usePopularMovie;
