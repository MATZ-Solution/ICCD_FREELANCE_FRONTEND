import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  redirectPath: null,
};

export const redirectSlice = createSlice({
  name: "redirectPath",
  initialState,
  reducers: {
    setRedirect: (state, action) => {
      state.redirectPath = action.payload;
    },
    resetRedirect: (state) => {
      state.redirectPath = null;
    },
  },
});

export const { setRedirect, resetRedirect } = redirectSlice.actions;

export default redirectSlice.reducer;
