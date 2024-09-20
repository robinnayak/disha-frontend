import axios from "axios";
import {
  booking_api,
  booking_detail_api,
  booking_list_api,
  ticket_list_api,
  daily_earnings_api,
  daily_earnings_list_api,
  reset_trip_api,
} from "./endpoints";

export const postBookingData = async (token, credential) => {
  //   console.log("booking credential", credential);
  const res = await axios.post(
    booking_api,
    {
      trip_id: credential.trip_id,
      seats: credential.seats,
      is_confirmed: credential.is_confirmed,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getBookingDatabyid = async (token, id) => {
  //   console.log("booking id", id);
  let booking_detail_url = `${booking_detail_api}${id}`;
  const res = await axios.get(booking_detail_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getBookingData = async (token) => {
  const res = await axios.get(booking_list_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res)
  return res.data;
};

export const getTicketData = async (token) => {
  const res = await axios.get(ticket_list_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res)
  return res.data;
};

export const postDailyEarnings = async (token, credential) => {
  // console.log("daily earnings credential", credential);
  const res = await axios.post(daily_earnings_api, credential, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};


export const getDailyEarnings = async (token)=>{
  const res = await axios.get(daily_earnings_list_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export const reset_trip = async (token,credential)=>{
  console.log("crediential",credential)
  const res = await axios.post(reset_trip_api,credential,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}