import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = {...state.userProfile, ...action.payload};
    },
    resetUserProfile: (state) => { 
        state.userProfile = {}
    }
  },
});

export const { setUserProfile, resetUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
