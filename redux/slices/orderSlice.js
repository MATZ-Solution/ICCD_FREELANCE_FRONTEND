
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  basePrice: 0,
  totalPrice: 0,
  packageType: "",
  packageDescription: "",
  delivery: "",
  revisions: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetOrder: () => initialState,
  },
});

export const { setOrderDetails, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
