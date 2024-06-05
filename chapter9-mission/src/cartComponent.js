import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { increase, decrease, calculateTotals, fetchCartItems } from "./cartSlice";
import { ChevronDown, ChevronUp } from "./constants/icons";
import { openModal } from "./modalSlice";
import { ClipLoader } from "react-spinners";

const CartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ccc;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 16px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ItemSinger = styled.p`
  margin: 4px 0;
`;

const ItemPrice = styled.p`
  margin: 4px 0;
  color: blue;
`;

const ItemIncrease = styled.div`
  cursor: pointer;
`;

const Amount = styled.span`
  margin: 0 10px;
  font-size: 20px;
`;

const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
`;

const ClearCartButton = styled.button`
  display: block;
  margin: 20px auto;
  color: #f44336;
  background-color: #ffffff;
  padding: 10px 20px;
  border: 1px solid #f44336;
  cursor: pointer;
  border-radius: 5px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const CartComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [cartStatus, dispatch]);

  useEffect(() => {
    if (cartStatus === 'succeeded') {
      dispatch(calculateTotals());
    }
  }, [items, cartStatus, dispatch]);

  const handleIncrease = (id) => {
    dispatch(increase({ id }));
    dispatch(calculateTotals());
  };

  const handleDecrease = (id) => {
    dispatch(decrease({ id }));
    dispatch(calculateTotals());
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  let content;

  if (cartStatus === 'loading') {
    content = (
      <LoadingContainer>
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </LoadingContainer>
    );
  } else if (cartStatus === 'succeeded') {
    content = (
      <>
        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemInfo>
              <ItemImage src={item.img} alt={item.title} />
              <ItemDetails>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemSinger>{item.singer}</ItemSinger>
                <ItemPrice>$ {parseFloat(item.price).toFixed(2)}</ItemPrice>
              </ItemDetails>
            </ItemInfo>
            <div>
              <ItemIncrease onClick={() => handleIncrease(item.id)}>
                <ChevronUp />
              </ItemIncrease>
              <Amount>{item.amount}</Amount>
              <ItemIncrease onClick={() => handleDecrease(item.id)}>
                <ChevronDown />
              </ItemIncrease>
            </div>
          </CartItem>
        ))}
        <TotalPrice>총 가격 $ {totalPrice.toFixed(2)}</TotalPrice>
        <ClearCartButton onClick={handleOpenModal}>
          장바구니 초기화
        </ClearCartButton>
      </>
    );
  } else if (cartStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <CartContainer>
      {content}
    </CartContainer>
  );
};

export default CartComponent;
