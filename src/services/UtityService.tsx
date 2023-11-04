import { makeRequest } from "../axios";

export const uploadImage = async (url:string,formData:FormData) => {
    const res = await makeRequest.post(url, formData);
    return res ;
}