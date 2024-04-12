import React from "react";
import { movies } from "./MovieDummy.js";
import Movie from "./Movie.js";
import styles from "./App.module.css";
function App() {
  const { results } = movies;

  const rows = [];
  for (let i = 0; i < results.length; i += 8) {
    const row = results
      .slice(i, i + 8)
      .map((movie) => <Movie key={movie.id} movie={movie} />);
    rows.push(
      <div key={i} className={styles.row}>
        {row}
      </div>
    );
  }

  return <div className={styles.container}>{rows}</div>;
}

export default App;
