import React from "react";
import { useState } from "react";
export const Counter = () => {
  const [num, setNum] = useState(0);
  const increaseHandler = () => {
    setNum((prev) => prev + 1);
  };
  const decreaseHandler = () => {
    setNum((prev) => prev - 1);
  };
  return (
    <div>
      <h2>{num}</h2>
      <div>
        <button onClick={increaseHandler}>+1</button>
        <button onClick={decreaseHandler}>-1</button>
      </div>
    </div>
  );
};
