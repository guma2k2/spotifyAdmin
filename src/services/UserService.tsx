import { makeRequest } from "../axios";

import { Role, UserPage, UserRequest, UserType } from "../types/UserType";


export const findAllUser = async () => {
    const res = await makeRequest.get<UserType[]>('/user');
    return res.data ;
}

export const findFirstPage = async () => {
    const res = await makeRequest.get<UserPage>('/user/firstPage');
    return res.data ;
}

export const listAllPage = async (numPage:number,sortDir:string, sortField:string,keyword:string|undefined ) => {
    const res = await makeRequest.get<UserPage>('/user/pageable/', {
        params: {
            numPage,sortDir,sortField,keyword
        }
    });
    return res.data ;
}

export const updateStatus = async (userId:number) => {
    const url = `/user/admin/update/status/${userId}`;
    const res = await makeRequest.put(url);
    return res.data ;
}

export const findUserById  = async(userId:number)=> {
    const url = `/user/admin/${userId}` ;
    const res = await makeRequest.get<UserType>(url);
    return res.data ;
}

export const findAllRole = async () => {
    const res = await makeRequest.get<Role[]>('/role');
    return res.data ;
}



export const addUser = async (request:UserRequest) => {
    const res = await makeRequest.post('/user', request);
    return res.data ;
}

export const updateUser = async (request:UserRequest, userId:number) => {
    const url = `/user/${userId}`;
    const res = await makeRequest.put(url, request);
    return res.data ;
}


export const viewPhotoImage  = async(userId:number)=> {
    const url = `/user/viewPhoto/${userId}` ;
    const res = await makeRequest.get(url);
    return res.data ;
}

export const uploadImage = async(formData:FormData, userId:number) =>  {
    const url = `/user/upload/image/${userId}`;
    const res = await makeRequest.post(url,formData)
    return res;
}






// Todo: find user by id, add/update User, findAll role