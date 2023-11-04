import { Link, useParams } from 'react-router-dom';
import './Shared.styles.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addPlaylist, findCategoryByIdReturnPlaylists, removePlaylist } from '../../services/CategoryService';
import {  findAllPlaylist } from '../../services/PlaylistService';
import { useState } from 'react';

const SharedCategory = () => {
    const {id, tag} = useParams();
    const queryClient = useQueryClient();
    const categoryId = id && parseInt(id) ;

    const getPlayslistCategory = useQuery({
        queryKey: ['category', categoryId],
        queryFn: ({ queryKey }) => findCategoryByIdReturnPlaylists(queryKey[1]),
    })
    const getAllPlaylist = useQuery({
        queryKey: ['playlist'],
        queryFn: findAllPlaylist
    })

    const dataPlaylists = getAllPlaylist.data;
    const [playlistSelection , setPlaylistSelection] = useState<number>(dataPlaylists?dataPlaylists[0].id:-1);


    const dataPlaylistsByCategory = getPlayslistCategory.data;
    if (getPlayslistCategory.isLoading) {
        return <div>Loading...</div>
    }

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        const playlistId = parseInt(e.target.value);
        setPlaylistSelection(playlistId);
    }
    const handleClick = async () => {
        const res = await addPlaylist(categoryId,playlistSelection);
        if(res.status === 200) {
            queryClient.invalidateQueries(['category', categoryId]);
        }
    }
    const handleDelete = async (playlistId:number) => {
        const res = await removePlaylist(categoryId,playlistId);
        if(res.status === 200) {
            queryClient.invalidateQueries(['category', categoryId]);
        }
    }
    return (
        <div className='shared'>
            <div className='top'>
                <div className='title'>{tag}</div>
                <Link to={"/category"} className='nav'>
                    Back
                </Link>
            </div>
            <div className="selection">
                <label>Playlist</label>
                <select value={playlistSelection} onChange={handleChange} >
                    {
                        dataPlaylists && dataPlaylists.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)
                    }
                </select>
                <button onClick={handleClick} >Add</button>
            </div>
            <div className='items'>
                {dataPlaylistsByCategory && dataPlaylistsByCategory.playlists.map((playlist) => 
                  <div className='item' key={playlist.id} >
                    <span className='itemName' >{playlist.name}</span>
                    <span className='itemAction' onClick={() => handleDelete(playlist.id)} >X</span>
                  </div>
                )}
            </div>
        </div>
    );
};

export default SharedCategory;