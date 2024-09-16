import { BASE_URL } from "../base";

const API_ROOT = "auth";

export const login_api = `${BASE_URL}/${API_ROOT}/login/`;
export const logout_api = `${BASE_URL}/${API_ROOT}/logout/`;
export const register_api = `${BASE_URL}/${API_ROOT}/register/`;
// http://localhost:8000/api/auth/forget-password/
export const forget_password_api = `${BASE_URL}/${API_ROOT}/forget-password/`;
// http://localhost:8000/api/auth/change-password/
export const change_password_api = `${BASE_URL}/${API_ROOT}/change-password/`;