import { makeRequest } from "../axios";
import { ReviewType } from "../types/ReviewType";

export const findAllReview = async () => {
    const res = await makeRequest.get<ReviewType[]>('/review');
    return res.data ;
}

export const updateStatus = async (reviewId:number) => {
    const url = `/review/admin/update/status/${reviewId}`;
    const res = await makeRequest.put(url);
    return res.data ;
}