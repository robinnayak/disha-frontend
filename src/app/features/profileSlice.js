import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialState = {
  status: null,
  organization_user: {
    username: "example_username",
    phone_number: "987*******",
    profile_image: null,
    address: "Example Address, Country",
    date_of_birth: null,
    name: "Organization Name",
    registration_number: "ORG-62893455******",
    description: "",
    logo: null,
    total_earnings: "0.00",
    remaining_earnings: "0.00",
    date_created: "2024-08-27T22:31:13.339334+05:45",
  },
  driver_user: {
    username: "example_username",
    phone_number: "987*******",
    profile_image: null,
    address: "",
    date_of_birth: null,
    license_number: "XBZ1********",
    experience: null,
    availability_status: true,
    total_earnings: "0.00",
    remaining_earnings: "0.00",
    date_created: "2024-08-29T21:03:08.497832+05:45",
    organization: null,
  },
  passenger_user: {
    phone_number: "1234567890",
    profile_image: null,
    address: "123 Main St, Cityville",
    date_of_birth: "1995-03-15", // Example date of birth (YYYY-MM-DD format)
    emergency_contact_name: "John Doe",
    emergency_contact_number: "9876543210",
    preferred_language: "English",
    loyalty_points: 0,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setOrganizationUser: (state, action) => {
      state.organization_user = action.payload;
    },
    setDriverUser: (state, action) => {
      state.driver_user = action.payload;
    },
    setPassengerUser: (state, action) => {
      state.passenger_user = action.payload;
    },
  },
});


export const {setOrganizationUser, setDriverUser, setPassengerUser} = profileSlice.actions;
export default profileSlice.reducer;