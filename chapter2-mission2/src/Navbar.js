import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Nav = styled.div`
  background-color: #171a32;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
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
`;
const NavRightList = styled(Link)`
  margin-left: 20px;
  color: white;
  text-decoration: none;
  &:hover {
    font-size: 20px;
  }
`;
const Upcoming = styled(Link)`
  color: #ffd700;
  font-weight: bold;
  margin-left: 20px;
  text-decoration: none;
  &:hover {
    font-size: 20px;
  }
`;
const Navbar = () => {
  return (
    <Nav>
      <Title to="/">UMC Movie</Title>
      <NavRight>
        <NavRightList to="/signup">회원가입</NavRightList>
        <NavRightList to="/popular">Popular</NavRightList>
        <NavRightList to="/nowplaying">Now Playing</NavRightList>
        <NavRightList to="/toprated">Top Rated</NavRightList>
        <Upcoming to="/upcoming">Upcoming</Upcoming>
      </NavRight>
    </Nav>
  );
};
export default Navbar;
