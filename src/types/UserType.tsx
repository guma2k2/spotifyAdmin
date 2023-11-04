export type UserType =  {
    id?: number
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    photoImagePath:string,
    fullName:string,
    gender:string,
    status:boolean
    role?: Role
}

export type Role = {
    id: number,
    name: string
}

export type UserRequest = {
    id?: number
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    gender:string
    status:boolean
    roleName:string
}

export type UserPage = {
    totalPage: number,
    sortDir: string, 
    sortField: string,
    content: UserType[]
}

export type UserCustomType =  {
    id?: number
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    photoImagePath:string,
    fullName:string
}

// "totalPage": 2,
//   "currentPage": 2,
//   "sortDir": "asc",
//   "sortField": "email",
//   "content": [