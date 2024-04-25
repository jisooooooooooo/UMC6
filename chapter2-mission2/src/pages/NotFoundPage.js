import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #1f1f43;
`;
const Div = styled.div`
  margin: 5px 0;
`;

const LinkMain = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
`;
export const NotFoundPage = () => {
  return (
    <Container>
      <h1>Oops!</h1>

      <Div>예상치 못한 에러가 발생했습니다</Div>
      <Div>Not Found</Div>
      <LinkMain to="/">메인으로 이동하기</LinkMain>
    </Container>
  );
};
