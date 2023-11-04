import { SongCustom } from './SongType'
import { UserCustomType } from './UserType'
export type AlbumType = {
    id:number,
    name:string,
    imagePath:string
    thumbnailPath: string,
    status:boolean
    songs: SongCustom[]
}


export type AlbumCustomType = {
    id:number,
    name:string,
    imagePath:string
    thumbnailPath: string,
    status:boolean
    user: UserCustomType
}


export type AlbumResponseType = {
    id:number,
    name:string,
    imagePath:string
    thumbnailPath: string,
    status:boolean
    songs: SongCustom[]
}

export type AlbumRequest = {
    id?:number,
    name:string,
}


export type AlbumPage = {
    totalPage: number,
    sortDir: string, 
    sortField: string,
    content: AlbumResponseType[]
}
