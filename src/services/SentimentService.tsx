import { makeRequest } from "../axios";
import axios from "axios";
import { SentimentType } from "../types/SentimentType";

const url = 'http://127.0.0.1:8000/sentiment/train/admin';
export const findAllSentiment = async () => {
    const res = await axios.get<SentimentType[]>(url)
    return res.data ;
}

export const saveSentiment = async (sentiment:SentimentType) => {
    const res = await axios.post(url, sentiment);
    return res.data ;
}

export const trainData = async () => {
    const url = "http://127.0.0.1:8000/sentiment/train";
    const res = await axios.get(url);
    return res.data ;
}

export const updateSentiment = async (sentiment:SentimentType) => {
    const res = await makeRequest.put(url,sentiment);
    return res.data ;
}

export const findById  = async(id:number)=> {
    const url = `http://127.0.0.1:8000/sentiment/train/admin/${id}` ;
    const res = await makeRequest.get<SentimentType>(url);
    return res ;
}

export const deleteById  = async(id:number)=> {
    const url = `http://127.0.0.1:8000/sentiment/train/admin/${id}`;
    const res = await makeRequest.delete<string>(url);
    return res.data ;
}