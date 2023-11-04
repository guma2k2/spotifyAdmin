import { makeRequest } from "../axios";
import { CategoryCustomType, CategoryPage, CategoryType } from "../types/CategoryType";


export const updateStatus = async (categoryId:number) => {
    const url = `/category/admin/update/status/${categoryId}`;
    const res = await makeRequest.put(url);
    return res.data ;
}

export const findAllCategory = async () => {
    const res = await makeRequest.get<CategoryType[]>('/category');
    return res.data ;
}

export const findAllCategoryParent = async () => {
    const res = await makeRequest.get<CategoryType[]>('/category/getAllParent');
    return res.data ;
}

export const addCategory = async (formData:FormData) => {
    const res = await makeRequest.post('/category/admin/save', formData);
    return res.data ;
}

export const findCategoryByID  = async(categoryId:number)=> {
    const url = `/category/admin/${categoryId}` ;
    const res = await makeRequest.get<CategoryType>(url);
    return res.data ;
}

export const findCategoryByIdReturnPlaylists  = async(categoryId:number | string | undefined)=> {
    const url = `/category/${categoryId}` ;
    const res = await makeRequest.get<CategoryCustomType>(url);
    return res.data ;
}

export const updateCategory = async (formData:FormData, categoryId:number) => {
    const url = `/category/admin/update/${categoryId}`;
    const res = await makeRequest.put(url, formData);
    return res.data ;
}

export const addPlaylist = async (categoryId:number | undefined | string, playlistId:number) => {
    const url = `/category/admin/${categoryId}/add/${playlistId}`
    const res = await makeRequest.get(url);
    return res ;
}

export const removePlaylist = async (categoryId:number | undefined | string, playlistId:number) => {
    const url = `/category/admin/${categoryId}/remove/${playlistId}`
    const res = await makeRequest.get(url);
    return res ;
}

export const findFirstPage = async () => {
    const res = await makeRequest.get<CategoryPage>('/category/firstPage');
    return res.data ;
}

export const listAllPage = async (numPage:number,sortDir:string, sortField:string,keyword:string|undefined ) => {
    const res = await makeRequest.get<CategoryPage>('/category/pageable/', {
        params: {
            numPage,sortDir,sortField,keyword
        }
    });
    return res.data ;
}
