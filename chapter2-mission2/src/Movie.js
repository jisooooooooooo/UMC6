import React from "react";
import styles from "./Movie.module.css";

const Movie = ({ movie }) => {
  return (
    <div className={styles.box}>
      <img
        className={styles.img}
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="movieimg"
      />
      <div className={styles.bottom}>
        <div>{movie.title}</div>
        <div>{movie.vote_average}</div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.overlaytitle}>{movie.title}</div>
        <div>
          {movie.overview.length > 100
            ? `${movie.overview.substring(0, 100)}...`
            : movie.overview}
        </div>
      </div>
    </div>
  );
};

export default Movie;
