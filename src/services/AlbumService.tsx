import { makeRequest } from "../axios";
import { AlbumCustomType, AlbumPage, AlbumType } from "../types/AlbumType";
import { AlbumRequest } from "../types/AlbumType";

export const findAllAlbum = async () => {
    const res = await makeRequest.get<AlbumType[]>('/album');
    return res.data ;
}

export const findAlbumById  = async(albumId:number | undefined | string)=> {
    const url = `/album/admin/${albumId}` ;
    const res = await makeRequest.get<AlbumCustomType>(url);
    return res.data ;
}

export const updateStatus = async (albumId:number) => {
    const url = `/album/update/status/${albumId}`;
    const res = await makeRequest.put(url);
    return res.data ;
}

export const addSong = async (albumId:number | undefined | string, songId:number) => {
    const url = `album/${albumId}/add/${songId}`
    const res = await makeRequest.get(url);
    return res ;
}

export const removeSong = async (albumId:number | undefined | string, songId:number) => {
    const url = `/album/${albumId}/remove/${songId}`;
    const res = await makeRequest.get(url);
    return res ;
}

export const uploadFile = async (albumId:number | undefined | string, formData:FormData) => {
    const url = `/album/uploadFile/${albumId}`;
    const res = await makeRequest.post(url,formData);
    return res ;
}

export const addAlbum = async (albumRequest:AlbumRequest,userID:number | undefined) => {
    const url = `/album/${userID}/add`
    const res = await makeRequest.post(url, albumRequest);
    return res ;
}

export const updateAlbum = async (albumRequest:AlbumRequest, albumId:number | undefined) => {
    const url = `/album/update/${albumId}`
    const res = await makeRequest.put(url, albumRequest);
    return res ;
}

export const findFirstPage = async () => {
    const res = await makeRequest.get<AlbumPage>('/album/firstPage');
    return res.data ;
}

export const listAllPage = async (numPage:number,sortDir:string, sortField:string,keyword:string|undefined ) => {
    const res = await makeRequest.get<AlbumPage>('/album/pageable/', {
        params: {
            numPage,sortDir,sortField,keyword
        }
    });
    return res.data ;
}