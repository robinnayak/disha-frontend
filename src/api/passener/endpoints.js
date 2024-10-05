import { BASE_URL } from "../base";

const API_ROOT = "passenger";
const PAYMENT_ROOT = "payment";

export const home_api = `${BASE_URL}/`;
// http://localhost:8000/api/passenger/payment/
// http://localhost:8000/api/passenger/user-payment/
export const payment_api = `${BASE_URL}/${API_ROOT}/${PAYMENT_ROOT}/`;
export const paystatus_api = `${BASE_URL}/${API_ROOT}/${PAYMENT_ROOT}/status/`;
export const payment_list_api = `${BASE_URL}/${API_ROOT}/user-payment/`;

// http://localhost:8000/api/passenger/ongoing-trips/
export const ongoingtrip_api = `${BASE_URL}/${API_ROOT}/ongoing-trips/`;
