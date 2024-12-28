import React from "react";
import infoImage from "../assets/information.png";
import playImage from "../assets/play.png";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='pt-56 px-14 w-[45vw] absolute bg-gradient-to-r from-black h-full '>
      <h1 className='font-extrabold text-6xl  text-white'>{title}</h1>
      <div className='w-[45vw]'>
        <p className='pt-4 text-white'>{overview}</p>
      </div>
      <div className='flex flex-row mt-3 gap-5'>
        <button className='flex flex-row px-6 py-2 bg-white rounded-sm  font-semibold items-center gap-2'>
          <img src={playImage} alt='playButton' className='w-5' />
          Play
        </button>
        <button className='flex flex-row px-6 py-2 bg-gray-400 rounded-sm  bg-opacity-25 text-white hover:bg-opacity-70 gap-1 items-center font-semibold'>
          <span>
            <img src={infoImage} alt='info' />
          </span>
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
