import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8080/musics"); // Adjust the URL accordingly
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "데이터를 불러오는 중 에러가 발생했습니다."
      ); // 에러 메시지 반환
    }
  }
);

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
  status: "idle",
  error: null,
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
      state.items.forEach((item) => {
        totalPrice += item.price * item.amount;
        totalItems += item.amount;
      });
      state.totalPrice = totalPrice;
      state.totalItems = totalItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        alert(action.payload);
        console.log(action.payload);
      });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
