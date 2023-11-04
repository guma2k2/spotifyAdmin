import { UserCustomType } from "./UserType"
export type ReviewType = {
    id:number,
    createdAt:string,
    content:string,
    user:UserCustomType
    status:boolean
    label:string
}