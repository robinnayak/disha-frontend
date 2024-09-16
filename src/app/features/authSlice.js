import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  user: {
    id: null,
    username: null,
    email: null,
    is_organization: false,
    is_driver: false,
    is_passenger: false,
  },
  token: "",
  user_type: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log("========================================")
      // console.log("action payload",action.payload)
      state.user = action.payload;
      // console.log("state user ",state.user)
      // console.log("========================================")
      if (state.user.user.is_organization) {
        state.user_type = "organization";
      } else if (state.user.user.is_driver) {
        state.user_type = "driver";
      } else if (state.user.user.is_passenger) {
        state.user_type = "passenger";
      } else {
        state.user_type = "unknown";
      }
      state.status = "logged_in"; // Optional: Update status
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      // Resetting to initial state
      state.status = "";
      // state.user = { ...initialState.user }; if we need to make user athenticate after one time login 
      state.user = "";
      state.token = "";
      state.user_type = "";
    },
  },
});

export const { setUser, setToken, setLogout } = authSlice.actions;
export default authSlice.reducer;
