import React from "react";
import { POSTER_PATH } from "../utils/constant";
const MovieCard = ({ movie }) => {
  return (
    <div className='w-44'>
      <img src={`${POSTER_PATH}${movie?.poster_path}`} alt='poster' />
    </div>
  );
};

export default MovieCard;
