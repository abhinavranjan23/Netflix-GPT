import { useDispatch } from "react-redux";
import { addnowPlaying } from "./moviesSlice";
import { NOWPLAYING_API, API_OPTIONS } from "./constant";
import { useEffect } from "react";

export const useNowPlaying = () => {
  const dispatch = useDispatch();
  const fetchNowPlaying = async () => {
    try {
      const response = await fetch(NOWPLAYING_API, API_OPTIONS);
      const jsondata = await response.json();
      dispatch(addnowPlaying(jsondata.results));
    } catch (error) {
      console.error("Error fetching now playing data:", error);
    }
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);
};
