import React from "react";
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
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

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
