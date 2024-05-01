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
    color: #ffd700;
    font-weight: bold;
  }
`;
const NavSignup = styled(Link)`
  font-size: 20px;
  color: #ffd700;
  font-weight: bold;
  text-decoration: none;
`;
const Navbar = () => {
  // const [isLoggedIn, setLoggedIn] = useState("로그인");

  // const loginHandler = () => {
  //   setLoggedIn((prev) => !prev);
  // };
  return (
    <Nav>
      <Title to="/">UMC Movie</Title>
      <NavRight>
        {/* <NavSignup to="/signup" onClick={loginHandler}> */}
          {/* {isLoggedIn ? "로그아웃" : "로그인"} */}
        {/* </NavSignup> */}
        <NavSignup to="/signup">회원가입</NavSignup>
        <NavRightList to="/popular">Popular</NavRightList>
        <NavRightList to="/nowplaying">Now Playing</NavRightList>
        <NavRightList to="/toprated">Top Rated</NavRightList>
        <NavRightList to="/upcoming">Upcoming</NavRightList>
      </NavRight>
    </Nav>
  );
};
export default Navbar;
