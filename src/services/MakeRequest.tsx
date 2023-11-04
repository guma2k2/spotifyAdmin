import axios from "axios";
import { refreshAccessToken } from "./AuthService";

export const makeRequest = axios.create({
    baseURL: 'https://localhost:8080/api/v1',
    // timeout: 1000,
});



axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = "";
      const access_token = await refreshAccessToken(refreshToken);            
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  });