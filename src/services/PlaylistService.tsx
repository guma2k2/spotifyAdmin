import { makeRequest } from "../axios";
import { PlaylistPage, PlaylistType } from "../types/PlaylistType";
import { SongCustom } from "../types/SongType";


export const findAllPlaylist = async () => {
    const res = await makeRequest.get<PlaylistType[]>('/playlist');
    return res.data;
}

export const addPlaylist = async (formData: FormData) => {
    const res = await makeRequest.post('/playlist/admin/save', formData);

    return res.data;
}

export const findPlaylistById = async (playlistId: number) => {
    const url = `/playlist/admin/${playlistId}`;
    const res = await makeRequest.get<PlaylistType>(url);
    return res.data;
}

export const updatePlaylist = async (formData: FormData, playlistId: number) => {
    const url = `/playlist/admin/update/${playlistId}`;
    const res = await makeRequest.put(url, formData, {
        headers: {
            "Content-Type": "form-data"
        }
    });
    return res.data;
}

export const findSongByPlaylistId = async (playlistId: number | string | undefined) => {
    const url = `/song/findBy/playlist/${playlistId}`;
    const res = await makeRequest.get<SongCustom[]>(url);
    return res.data;
}

export const addSong = async (playlistId: number | undefined | string, songId: number) => {
    const url = `/playlist/${playlistId}/add/song/${songId}`
    const res = await makeRequest.get(url);
    return res;
}

export const removeSong = async (playlistId: number | undefined | string, songId: number) => {
    const url = `/playlist/admin/${playlistId}/remove/${songId}`;
    const res = await makeRequest.get(url);
    return res;
}

export const findFirstPage = async () => {
    const res = await makeRequest.get<PlaylistPage>('/playlist/firstPage');
    return res.data;
}

export const listAllPage = async (numPage: number, sortDir: string, sortField: string, keyword: string | undefined) => {
    const res = await makeRequest.get<PlaylistPage>('/playlist/pageable/', {
        params: {
            numPage, sortDir, sortField, keyword
        }
    });
    return res.data;
}