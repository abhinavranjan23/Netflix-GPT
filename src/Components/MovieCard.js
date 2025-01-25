import React from "react";
import { POSTER_PATH } from "../utils/constant";
const MovieCard = ({ movie }) => {
  if (!movie.poster_path) return;
  return (
    <div className='w-20 sm:w-44'>
      <img src={`${POSTER_PATH}${movie?.poster_path}`} alt='poster' />
    </div>
  );
};

export default MovieCard;
