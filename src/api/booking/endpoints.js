import { BASE_URL } from "../base";

const API_ROOT = "booking";

export const booking_api = `${BASE_URL}/${API_ROOT}/create/`;
export const booking_detail_api = `${BASE_URL}/${API_ROOT}/detail/`;
// /filter/
export const booking_list_api = `${BASE_URL}/${API_ROOT}/filter/`;
// http://localhost:8000/api/booking/tickets/

export const ticket_list_api = `${BASE_URL}/${API_ROOT}/tickets/`;

// http://localhost:8000/api/booking/daily-earnings/create/

export const daily_earnings_api = `${BASE_URL}/${API_ROOT}/daily-earnings/create/`;
// http://localhost:8000/api/booking/daily-earnings/filter/
export const daily_earnings_list_api = `${BASE_URL}/${API_ROOT}/daily-earnings/filter/`;
export const reset_trip_api = `${BASE_URL}/${API_ROOT}/reset-trip/`