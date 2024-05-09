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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;
const PersonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px 15px;
`;
const PersonBoxTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 30px;
`;
const PersonImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  
`;
const PersonName = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
`;
const PersonRole = styled.div`
  text-align: center;
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

  const [credits, setCredits] = useState(null);
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
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
        setCredits(data);
      } catch (error) {
        console.error("Error fetching credits: ", error);
      }
    };

    fetchCredits();
  }, [id]);

  if (!movie || !credits) {
    return null;
  }
  const noImageSrc =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s";

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
        <PersonBoxTitle>출연진 및 제작진</PersonBoxTitle>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {credits.cast.slice(0, 10).map((person) => (
            <PersonContainer key={person.id}>
              <PersonImg
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : noImageSrc
                }
                alt={`${person.name} profile`}
              />
              <div>
                <PersonName>{person.name}</PersonName>
                <PersonRole>{person.known_for_department}</PersonRole>
              </div>
            </PersonContainer>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {credits.crew.slice(0, 10).map((person) => (
            <PersonContainer key={person.id}>
              <PersonImg
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : noImageSrc
                }
                alt={`${person.name} profile`}
              />
              <div>
                <PersonName>{person.name}</PersonName>
                <PersonRole>{person.known_for_department}</PersonRole>
              </div>
            </PersonContainer>
          ))}
        </div>
      </PersonBox>
    </div>
  );
};

export default SearchMovieDetail;
