import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #1f1f43;
  padding: 0 50px 0 50px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const Box = styled(Link)`
  position: relative;
  background-color: #373b6a;
  height: 370px;
  color: white;
  margin: 10px;
  width: 250px;
  text-decoration: none;
  box-sizing: border-box;
  &:hover {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 280px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.736);
  color: white;
  opacity: 0;
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  ${Box}:hover & {
    opacity: 1;
  }
`;

const Overtitle = styled.div`
  margin-bottom: 10px;
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const cache = useRef(new Map());

  const fetchMovies = async (page) => {
    if (cache.current.has(page)) {
      setMovies((prevMovies) => [...prevMovies, ...cache.current.get(page)]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzVlYzI3ZjgzODQwODFhZjVlNGYxYWJhMjcyZGI4OCIsInN1YiI6IjY2MjFkNmQyY2NkZTA0MDE4ODA2NGIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9p6u7J4co7Lgu_v1SGf9S-NAJSPjBsEaCsv9elKP1n0",
          },
        }
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        cache.current.set(page, data.results);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, hasMore]);

  return (
    <Container>
      <Row>
        {movies.map((movie, index) => (
          <Box key={index} to={`/now_playing/movie/${movie.id}`}>
            <Img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movieimg"
            />
            <Bottom>
              <div>{movie.title}</div>
              <div>⭐ {movie.vote_average}</div>
            </Bottom>
            <Overlay>
              <Overtitle>{movie.title}</Overtitle>
              <div>
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </div>
            </Overlay>
          </Box>
        ))}
      </Row>
      {loading && <LoadingSpinner />}
      <div ref={loader} />
    </Container>
  );
};

export default NowPlayingPage;
