import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Sidebar from "./pages/Sidebar";
const Nav = styled.div`
  background-color: #171a32;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
`;

const Title = styled(Link)`
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
`;

const NavRight = styled.div`
  display: flex;
  font-size: 18px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavRightList = styled(Link)`
  margin-left: 20px;
  color: white;
  text-decoration: none;
  &:hover {
    font-size: 20px;
    color: #ffd700;
    font-weight: bold;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.logout ? "#ffd700" : "white")};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    font-size: 22px;
    font-weight: bold;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  text-decoration: none;
  &:hover {
    font-size: 22px;
    font-weight: bold;
  }
`;

const MenuIcon = styled(FaBars)`
  display: none;
  color: white;
  font-size: 25px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Nav>
        <Title to="/">UMC Movie</Title>
        <MenuIcon onClick={toggleSidebar} />
        <NavRight>
          {isLoggedIn ? (
            <NavButton logout onClick={onLogout}>
              로그아웃
            </NavButton>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/signup">회원가입</NavLink>
            </>
          )}
          <NavRightList to="/popular">Popular</NavRightList>
          <NavRightList to="/nowplaying">Now Playing</NavRightList>
          <NavRightList to="/toprated">Top Rated</NavRightList>
          <NavRightList to="/upcoming">Upcoming</NavRightList>
        </NavRight>
      </Nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </>
  );
};

export default Navbar;
