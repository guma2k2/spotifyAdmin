import axios from 'axios';

// Get the access token from localStorage
const accessToken = localStorage.getItem('access_token');

// Create the axios instance
export const makeRequest = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        "Authorization": accessToken ? "Bearer " + accessToken : undefined
    }
});
