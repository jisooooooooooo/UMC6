import React from "react";
import styled from "styled-components";

const Top = styled.div`
  background-color: black;
  height: 350px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  background-color: #1f1f43;
  padding-top: 30px;
`;
const BottomInput = styled.input`
  background-color: white;
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 20px;
  margin-right: 15px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;
const MainPage = () => {
  return (
    <div>
      <Top>환영합니다</Top>
      <Bottom>
        <div>
          <div>📽️ Find your movies !</div>
          <Search>
            <BottomInput type="text" />
            <div>🔍</div>
          </Search>
        </div>
      </Bottom>
    </div>
  );
};
export default MainPage;
