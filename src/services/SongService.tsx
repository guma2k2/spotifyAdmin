import { makeRequest } from "../axios";
import { SongCustom, SongPage } from "../types/SongType";

export const findAllSong = async () => {
    const res = await makeRequest.get<SongCustom[]>('/song');
    return res.data ;
}

export const addSong = async (formData:FormData) => {
    const res = await makeRequest.post('/song/admin/save', formData);
    return res.data ;
}


export const updateUser = async (formData:FormData, userId:number) => {
    const url = `/user/admin/update/${userId}`;
    const res = await makeRequest.put(url, formData, {headers: {
        "Content-Type": "form-data"}});
    return res.data ;
}

export const updateStatus = async (userId:number) => {
    const url = `/song/update/status/${userId}`;
    const res = await makeRequest.put(url);
    return res.data ;
}

export const findFirstPage = async () => {
    const res = await makeRequest.get<SongPage>('/song/firstPage');
    return res.data ;
}

export const listAllPage = async (numPage:number,sortDir:string, sortField:string,keyword:string|undefined ) => {
    const res = await makeRequest.get<SongPage>('/song/pageable/', {
        params: {
            numPage,sortDir,sortField,keyword
        }
    });
    return res.data ;
}