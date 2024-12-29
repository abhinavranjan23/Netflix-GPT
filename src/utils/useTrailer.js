import { useDispatch } from "react-redux";
import { addTrailer } from "./moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "./constant";

export const useTrailer = (id) => {
  const dispatch = useDispatch();
  const getVideoBg = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const trailer = filterData[0];
    dispatch(addTrailer(trailer));
  };
  useEffect(() => {
    getVideoBg();
  }, [id]);
};
