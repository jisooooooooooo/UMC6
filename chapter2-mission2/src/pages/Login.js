import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: #1f1f43;
  display: flex;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 18px;
  color: white;
  margin-bottom: 30px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const Input = styled.input`
  width: 500px;
  height: 40px;
  padding-left: 15px;
  border: none;
  margin-bottom: 15px;
  border-radius: 20px;
`;
const Button = styled.button`
  width: 500px;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 25px;
  margin-bottom: 40px;
  margin-top: 40px;
  background-color: ${(props) => (props.enabled ? "#ffd700" : "white")};
`;

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("완료");
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>로그인 페이지</Title>
        <Input type="text" placeholder="아이디" />

        <Input type="password" placeholder="비밀번호" />

        <Button type="submit">제출하기</Button>
      </Form>
    </Container>
  );
};
export default Login;
