import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
