// Modal.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "./modalSlice";
import { clearCart, calculateTotals } from "./cartSlice";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(calculateTotals());
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>담아두신 모든 음반을 삭제하시겠습니까?</p>
        <Button onClick={handleClearCart} style={{ backgroundColor: '#f44336', color: '#fff' }}>네</Button>
        <Button onClick={handleClose} style={{ backgroundColor: '#ccc' }}>아니오</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
