import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Top = styled.div`
  background-color: black;
  height: 400px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.div`
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  color: white;
  font-size: 30px;
  font-weight: bold;
  background-color: #1f1f43;
  padding-top: 30px;
`;

const BottomInput = styled.input`
  background-color: white;
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 20px;
  margin-right: 15px;
  padding-left: 15px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-left: 60px;
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: center;
  overflow-y: auto;
  max-height: calc(100vh - 550px);
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1f1f43;
  }

  &::-webkit-scrollbar-thumb {
    background-color: yellow;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: gold;
  }
`;

const Box = styled(Link)`
  position: relative;
  background-color: #373b6a;
  height: 330px;
  color: white;
  margin: 10px;
  width: calc(100% / 4 - 20px);
  text-decoration: none;
  max-width: 250px;
  box-sizing: border-box;
  &:hover {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
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
const SearchContainer = styled.div`
  background-color: #1f1f43;
  display: flex;
  justify-content: center;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MovieBottom = styled.div`
  font-size: 23px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
`;
const Overtitle = styled.div`
  margin-bottom: 10px;
`;
const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchMovies, setSearchMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  // 디바운스를 적용
  const searchMoviesHandler = (query) => {
    setSearchTerm(query);
    clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchMovies(query);
    }, 500); // 500ms 후에 검색
    setDebounceTimer(timer);
  };

  const fetchMovies = async (query) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzVlYzI3ZjgzODQwODFhZjVlNGYxYWJhMjcyZGI4OCIsInN1YiI6IjY2MjFkNmQyY2NkZTA0MDE4ODA2NGIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9p6u7J4co7Lgu_v1SGf9S-NAJSPjBsEaCsv9elKP1n0",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setSearchMovies(data.results || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Top>환영합니다</Top>
      <Bottom>
        <SearchBox>
          <div>📽️ Find your movies !</div>
          <Search>
            <BottomInput
              type="text"
              value={searchTerm}
              onChange={(e) => searchMoviesHandler(e.target.value)}
            />
            <div>🔍</div>
          </Search>
        </SearchBox>
        <SearchContainer>
          <Row>
            {isLoading ? (
              <div>데이터를 받아오는 중 입니다...</div>
            ) : error ? (
              <div>Failed to fetch data. Please try again later.</div>
            ) : searchMovies.length === 0 ? (
              <div>No movies found.</div>
            ) : (
              searchMovies.map((movie) => (
                <Box key={movie.id} to={`/search/movie/${movie.id}`}>
                  <Img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movieimg"
                  />
                  <MovieBottom>
                    <div>{movie.title}</div>
                    <div>⭐ {movie.vote_average}</div>
                  </MovieBottom>
                  <Overlay>
                    <Overtitle>{movie.title}</Overtitle>
                    <div>
                      {movie.overview.length > 100
                        ? `${movie.overview.substring(0, 100)}...`
                        : movie.overview}
                    </div>
                  </Overlay>
                </Box>
              ))
            )}
          </Row>
        </SearchContainer>
      </Bottom>
    </div>
  );
};
export default MainPage;
