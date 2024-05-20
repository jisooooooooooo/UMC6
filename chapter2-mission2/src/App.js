import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PopularPage from "./pages/PopularPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import TopRatedPage from "./pages/TopRatedPage";
import UpComing from "./pages/UpComing";
import MovieDetail from "./pages/MovieDetail";
import { NotFoundPage } from "./pages/NotFoundPage";
import SearchMovieDetail from "./pages/SearchMovieDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setUserName(data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user info: ", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <Router>
      <>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainPage userName={userName} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={fetchUserInfo} />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/nowplaying" element={<NowPlayingPage />} />
          <Route path="/toprated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpComing />} />
          <Route path="/:category/movie/:title" element={<MovieDetail />} />
          <Route path="/search/movie/:id" element={<SearchMovieDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
