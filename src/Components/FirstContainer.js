import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNowPlaying } from "../utils/useNowPlaying";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import MovieCard from "./MovieCard";

const FirstContainer = () => {
  // Fetch now playing data
  useNowPlaying();
  const nowPlayingData = useSelector((store) => store.movies?.nowPlaying);
  const scrollContainerRef = useRef(null);

  // Handle scroll function
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  if (!nowPlayingData || nowPlayingData.length === 0) {
    return <div></div>;
  }

  const { original_title, overview, id } = nowPlayingData[3];

  return (
    <div className='relative max-w-screen h-screen overflow-hidden'>
      {/* Video Title */}
      <VideoTitle title={original_title} overview={overview} />

      {/* Video Background */}
      <VideoBackground id={id} />

      {/* Now Playing Section */}
      <div
        className='flex flex-col pl-14 absolute bottom-0 left-0 right-0 gap-y-3 bg-gradient-to-t from-black pb-1'
        style={{ height: "180px", width: "100%" }}
      >
        <h2 className='text-white font-semibold text-lg'>Now Playing</h2>

        <div className='relative'>
          {/* Scroll Buttons */}
          <button
            onClick={() => handleScroll(-1)}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-60 text-center font-black'
          >
            ←
          </button>
          <button
            onClick={() => handleScroll(1)}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-60 text-center font-black'
          >
            →
          </button>

          {/* Movie Cards Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className='flex overflow-x-scroll no-scrollbar items-center flex-nowrap gap-1 py-3 overflow-y-clip'
          >
            {nowPlayingData.map((movie, index) => (
              <div key={index} className='flex-shrink-0 h-24'>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstContainer;
