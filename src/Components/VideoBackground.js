import React from "react";
import { useSelector } from "react-redux";
import { useTrailer } from "../utils/useTrailer";

const VideoBackground = ({ id }) => {
  const trailer = useSelector((store) => store.movies?.trailer);

  useTrailer(id);
  if (!trailer) return;
  return (
    <div className='w-screen h-screen overflow-clip '>
      <iframe
        className='w-screen aspect-video '
        src={`https://www.youtube.com/embed/${trailer?.key}?controls=0&rel=0&modestbranding=1&iv_load_policy=3&playlist=${trailer?.key}&loop=1&autoplay=1&mute=1`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
