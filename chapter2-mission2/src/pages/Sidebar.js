import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #171a32;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1000;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.3s forwards;
`;

const CloseIcon = styled(FaTimes)`
  align-self: flex-end;
  cursor: pointer;
  font-size: 25px;
`;

const SidebarLink = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  margin: 15px 0;
  &:hover {
    font-size: 22px;
    color: #ffd700;
    font-weight: bold;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, onLogout }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseIcon onClick={toggleSidebar} />
      {isLoggedIn ? (
        <SidebarLink as="button" onClick={onLogout}>
          로그아웃
        </SidebarLink>
      ) : (
        <>
          <SidebarLink to="/login" onClick={toggleSidebar}>로그인</SidebarLink>
          <SidebarLink to="/signup" onClick={toggleSidebar}>회원가입</SidebarLink>
        </>
      )}
      <SidebarLink to="/popular" onClick={toggleSidebar}>Popular</SidebarLink>
      <SidebarLink to="/nowplaying" onClick={toggleSidebar}>Now Playing</SidebarLink>
      <SidebarLink to="/toprated" onClick={toggleSidebar}>Top Rated</SidebarLink>
      <SidebarLink to="/upcoming" onClick={toggleSidebar}>Upcoming</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
