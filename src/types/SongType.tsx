export type Song = {
    id:number,
    lyric: string, 
    genre:string,
    name:string
    status:boolean
    label:string

}

export type SongCustom = {
    id:number,
    name:string,
    status:boolean
    label:string
}


export type SongPage = {
    totalPage: number,
    sortDir: string, 
    sortField: string,
    content: Song[]
}