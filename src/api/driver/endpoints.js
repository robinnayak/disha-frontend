import { BASE_URL } from "../base";

const API_ROOT = "driver";

// http://localhost:8000/api/driver/organization/
export const driver_profile_api = `${BASE_URL}/${API_ROOT}/profile/`;
export const driver_organization_profile_api = `${BASE_URL}/${API_ROOT}/organization/`;
// http://localhost:8000/api/driver/trip/completed/
export const set_tripcomplete_api = `${BASE_URL}/${API_ROOT}/trip/completed/`

