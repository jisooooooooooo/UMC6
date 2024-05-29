import { createSlice } from "@reduxjs/toolkit";
import cartItems from "./constants/cartItems";

const initialState = {
  items: cartItems,
  totalPrice: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount -= 1;
        if (item.amount === 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
    calculateTotals: (state) => {
      let totalPrice = 0;
      let totalItems = 0;
      state.items.forEach(item => {
        totalPrice += item.price * item.amount;
        totalItems += item.amount;
      });
      state.totalPrice = totalPrice;
      state.totalItems = totalItems;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
