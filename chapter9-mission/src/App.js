// App.js
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CartComponent from "./cartComponent";
import Header from "./Header";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import Modal from "./Modal";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <CartComponent />
        <Modal /> 
      </div>
    </Provider>
  );
}

export default App;
