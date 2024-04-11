import React from "react";
import { useState } from "react";
import { ModalContent } from "./components/ModalContent";
import styles from "./Modal.module.css";
export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <h2>안녕하세요!</h2>
      <p>내용내용내용</p>
      <button className={styles.openbtn} onClick={openHandler}>
        버튼 열기
      </button>
      {isOpen && (
        <div className={styles.modalwrapper}>
          <ModalContent onClose={closeHandler} />
        </div>
      )}
    </div>
  );
};
