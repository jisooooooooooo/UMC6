import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  padding: 0 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f43;
`;
const MovieImg = styled.img`
  width: 700px;
  height: 500px;
`;

const ContentBox = styled.div`
  margin-left: 80px;
`;
const MovieTitle = styled.div`
  font-weight: bold;
  color: white;
  font-size: 30px;
`;
const MovieContent = styled.div`
  color: white;
  margin-top: 20px;
  font-weight: bold;
`;
const MovieOverview = styled.div`
  color: white;
  margin-top: 20px;
`;
const Star = styled.span`
  color: yellow;
`;
const PersonBox = styled.div`
  color: white;
  background-color: #1f1f43;
`;
const renderStars = (rating) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  for (let i = 0; i < filledStars; i++) {
    stars.push(<Star key={i}>⭐️</Star>);
  }
  return stars;
};

const SearchMovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1`,
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
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie detail: ", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <div>
      <Box>
        <MovieImg
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie poster"
        />
        <ContentBox>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieContent>평점 {renderStars(movie.vote_average)}</MovieContent>
          <MovieContent>개봉일 {movie.release_date}</MovieContent>
          <MovieContent>줄거리</MovieContent>
          <MovieOverview>
            {movie.overview
              ? movie.overview
              : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}
          </MovieOverview>
        </ContentBox>
      </Box>
      <PersonBox>
        <div>출연진 및 제작진</div>
      </PersonBox>
    </div>
  );
};

export default SearchMovieDetail;
