import { makeRequest } from "../axios"

export const refreshAccessToken = async (refreshToken:string)  => {
    const config = {
        headers: { Authorization: `Bearer ${refreshToken}` }
    };
    const res  = await makeRequest.post('/api/v1/auth/refreshToken',config);
    return res;
}