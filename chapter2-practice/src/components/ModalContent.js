import React from "react";
import styles from "./ModalContent.module.css";
export const ModalContent = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modaltitle}>안녕하세요</div>
      <p>모달 내용은 어쩌고 저쩌고..</p>
      <div className={styles.close}>
        <button className={styles.closebtn} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};
