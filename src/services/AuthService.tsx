import { makeRequest } from "../axios"
import { LoginRequest } from "../types/LoginType";

export const refreshAccessToken = async (refreshToken:string)  => {
    const config = {
        headers: { Authorization: `Bearer ${refreshToken}` }
    };
    const res  = await makeRequest.post('/api/v1/auth/refreshToken',config);
    return res;
}

export const login = async (request:LoginRequest) => {
    const res = await makeRequest.post('/auth/authenticate', request);
    return res ;
}