import { useRef } from "react";
import MovieCard from "./MovieCard";
import { scrollContainer } from "../utils/useScroll";

const Section = ({ title, data }) => {
  const containerRef = useRef(null);

  if (!data || data.length === 0) return null;

  return (
    <div className='flex flex-col gap-3 py-4 relative '>
      <h2 className='text-white font-semibold text-lg py-3'>{title}</h2>
      <div
        ref={containerRef}
        className='flex overflow-x-scroll no-scrollbar items-center scroll-smooth'
      >
        <div className='flex gap-4'>
          {data.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      </div>

      {/* <button
        onClick={() => scrollContainer(containerRef, -1)}
        className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-60 rounded-full p-1 w-8 h-8 flex items-center justify-center'
      >
        ←
      </button>
      
      <button
        onClick={() => scrollContainer(containerRef, 1)}
        className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-60 rounded-full p-1 w-8 h-8 flex items-center justify-center'
      >
        →
      </button> */}
    </div>
  );
};
export default Section;
