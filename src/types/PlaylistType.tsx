export type PlaylistType = {
    id:number,
    name:string
    description: string, 
    imagePath: string,
    thumbnailPath: string
}

export type PlaylistPage = {
    totalPage: number,
    sortDir: string, 
    sortField: string,
    content: PlaylistType[]
}