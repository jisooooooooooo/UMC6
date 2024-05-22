import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#555" : "#333")};
  color: white;
  border: none;
  cursor: pointer;
`;

const ArrowButton = styled(PaginationButton)`
  font-size: 20px;
`;

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (cache[currentPage]) {
        setMovies(cache[currentPage]);
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
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
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 1);
          setLoading(false);
          setCache((prevCache) => ({
            ...prevCache,
            [currentPage]: data.results,
          }));
        } catch (error) {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [currentPage, cache]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Row>
            {movies.map((movie) => (
              <Box key={movie.id} to={`/popular/movie/${movie.title}`}>
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
          <PaginationContainer>
            <ArrowButton onClick={handlePrevPage} disabled={currentPage === 1}>
              <FaArrowLeft />
            </ArrowButton>
            <PaginationButton>{currentPage}</PaginationButton>
            <ArrowButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </ArrowButton>
          </PaginationContainer>
        </>
      )}
    </Container>
  );
};

export default PopularPage;
