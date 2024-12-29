import { useEffect } from "react";
import { API_OPTIONS, POPULAR_TVSHOW_API } from "./constant";
import { useDispatch } from "react-redux";
import { addPopularShow } from "./tvShowSlice";

const usePopularTvShow = () => {
  const dispatch = useDispatch();
  const popular = async () => {
    const data = await fetch(POPULAR_TVSHOW_API, API_OPTIONS);
    const json = await data.json();
    const result = json.results;
    dispatch(addPopularShow(result));
  };
  useEffect(() => {
    popular();
  }, []);
};
export default usePopularTvShow;
