import { useEffect } from "react";
import { API_OPTIONS, UPCOMING_API } from "./constant";
import { useDispatch } from "react-redux";
import { addUpcoming } from "./moviesSlice";

const useUpComingMovie = () => {
  const dispatch = useDispatch();
  const upComing = async () => {
    const data = await fetch(UPCOMING_API, API_OPTIONS);
    const json = await data.json();
    const MovieResult = json.results;
    dispatch(addUpcoming(MovieResult));
  };
  useEffect(() => {
    upComing();
  }, []);
};
export default useUpComingMovie;
