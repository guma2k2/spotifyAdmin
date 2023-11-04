import { PlaylistType } from "./PlaylistType"

export type CategoryType = {
    id: number,
    title: string,
    imagePath:string,
    thumbnailPath:string,
    categoryParentTitle: string
    status:boolean
}


export type CategoryCustomType = {
    id: number,
    title: string,
    imagePath:string,
    thumbnailPath:string,
    status:boolean
    playlists: PlaylistType[]
}

export type CategoryPage = {
    totalPage: number,
    sortDir: string, 
    sortField: string,
    content: CategoryType[]
}