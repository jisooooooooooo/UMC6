import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Id = styled.div`
  color: white;
  margin-right: 20px;
`;
const Login = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
`;
const ErrorBox = styled.div`
  text-align: left;
  width: 500px;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 15px;
`;
const Signup = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    id: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const validateInputs = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "이름을 입력해주세요!";
    }
    if (!id.trim()) {
      errors.id = "아이디를 입력해주세요!";
    }

    if (!email.trim() || !email.includes("@")) {
      errors.email = "이메일을 입력해주세요!";
    }

    if (isNaN(age)) {
      errors.age = "나이는 숫자로 입력해주세요!";
    } else if (age % 1 !== 0) {
      errors.age = "나이는 정수로 입력해주세요!";
    } else if (age < 0) {
      errors.age = "나이는 양수여야 합니다!";
    } else if (age < 19) {
      errors.age = "19세 이상만 사용 가능합니다!";
    } else {
      errors.age = "";
    }

    if (password.length < 4) {
      errors.password = "최소 4자리 이상 입력해주세요!";
    } else if (password.length > 12) {
      errors.password = "최대 12자리까지 가능합니다!";
    } else if (
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      errors.password = "영어, 숫자, 특수문자를 모두 조합해 작성해주세요!";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호를 다시 입력해주세요!";
    }

    return errors;
  };

  const handleInputChange = (setter, value) => {
    setter(value);

    const errors = validateInputs();
    const isValid = Object.values(errors).every((error) => error === "");

    setErrorMessages(errors);
    setSubmitEnabled(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("회원가입이 성공적으로 완료되었습니다.");
    window.location.href = "/login";

    console.log("완료");
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입 페이지</Title>
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => handleInputChange(setName, e.target.value)}
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.name}</ErrorMessage>
        </ErrorBox>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => handleInputChange(setId, e.target.value)}
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.id}</ErrorMessage>
        </ErrorBox>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => handleInputChange(setEmail, e.target.value)}
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.email}</ErrorMessage>
        </ErrorBox>
        <Input
          type="text"
          placeholder="나이를 입력해주세요"
          value={age}
          onChange={(e) => handleInputChange(setAge, e.target.value)}
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.age}</ErrorMessage>
        </ErrorBox>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => handleInputChange(setPassword, e.target.value)}
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.password}</ErrorMessage>
        </ErrorBox>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) =>
            handleInputChange(setConfirmPassword, e.target.value)
          }
        />
        <ErrorBox>
          <ErrorMessage>{errorMessages.confirmPassword}</ErrorMessage>
        </ErrorBox>
        <Button type="submit" enabled={submitEnabled}>
          제출하기
        </Button>
        <Wrapper>
          <Id>이미 아이디가 있으신가요?</Id>
          <Login to="/login">로그인 페이지로 이동하기</Login>
        </Wrapper>
      </Form>
    </Container>
  );
};
export default Signup;
