import axios from "axios";
import { home_api, payment_api, paystatus_api,payment_list_api } from "./endpoints";

export const getHome = async (token) => {
  const res = await axios.get(home_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postPayment = async (token, credential) => {
  console.log("credential", credential);
  const res = await axios.post(
    payment_api,
    {
      booking_id: credential.booking_id,
      payment_method: credential.payment_method,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getPayStatus = async (token,txn_id) => {
  let url_with_id = `${paystatus_api}${txn_id}`
  const res = await axios.get(url_with_id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getPaymentList = async (token)=>{
  const res = await axios.get(payment_list_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

