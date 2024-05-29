// Header.js
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CartIcon } from "./constants/icons";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 240px;
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const CartContainer = styled.div`
  position: relative;

  height: 34px;
  width: 34px;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f87171;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartIconStyled = styled(CartIcon)`
  height: 34px;
  width: 34px;
`;

const Header = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <HeaderContainer>
      <Title>UMC PlayList</Title>
      <CartContainer>
        <CartIconStyled />
        {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;
