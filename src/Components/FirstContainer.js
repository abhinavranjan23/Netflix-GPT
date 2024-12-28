import React from "react";
import { useSelector } from "react-redux";
import { useNowPlaying } from "../utils/useNowPlaying";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const FirstConatiner = () => {
  useNowPlaying();
  const nowplayingData = useSelector((store) => store.movies?.nowPlaying);

  if (!nowplayingData || nowplayingData.length === 0) {
    return <div></div>;
  }
  console.log(nowplayingData[0].overview);
  const { original_title, overview, id } = nowplayingData[2];
  return (
    <div className='max-w-full overflow-hidden'>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground id={id} />
    </div>
  );
};

export default FirstConatiner;
