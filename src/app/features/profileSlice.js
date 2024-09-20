import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  profile: {
    
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      console.log("actions",action)
      state.profile = action.payload; // Directly assigning the payload to profile
    },
    clearProfile: (state) => {
      state.profile = { ...initialState.profile };
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;