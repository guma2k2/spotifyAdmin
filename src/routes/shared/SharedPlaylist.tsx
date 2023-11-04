import { Link, useParams } from 'react-router-dom';
import './Shared.styles.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addSong, findSongByPlaylistId, removeSong } from '../../services/PlaylistService';
import { findAllSong } from '../../services/SongService';
import { useState } from 'react';

const SharedPlaylist = () => {
    const queryClient = useQueryClient();
    const {id, tag} = useParams();
    const playlistId = id && parseInt(id) ;
    const getSongByPlaylist = useQuery({
        queryKey: ['playlist',playlistId],
        queryFn: ({ queryKey }) => findSongByPlaylistId(queryKey[1]),
    })

    const getSongs = useQuery({
        queryKey: ['song'],
        queryFn: findAllSong
    })

    const dataSongs = getSongs.data;
    const [songSelection, setSongSelection] = useState<number>(dataSongs?dataSongs[0].id:-1);

    const dataSongsByPlaylist = getSongByPlaylist.data;
    if(getSongByPlaylist.isLoading) {
        return <div>Loading...</div>
    }

    
    const handleClick = async () => {
        const res = await addSong(playlistId,songSelection);
        if(res.status === 200) {
            queryClient.invalidateQueries(['playlist', playlistId]);
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const songId = parseInt(e.target.value);
        setSongSelection(songId);
    }
    
    const handleDelete = async (songId:number) => {
        const res = await removeSong(playlistId,songId);
        if(res.status === 200) {
            queryClient.invalidateQueries(['playlist', playlistId]);
        }
    }
    return (
        <div className='shared'>
            <div className='top'>
                <div className='title'>{tag}</div>
                <Link to={"/playlist"} className='nav'>
                    Back
                </Link>
            </div>
            <div className="selection">
                <label>Playlist</label>
                <select value={songSelection} onChange={handleChange} >
                    <option>select song</option>
                    {
                        dataSongs && dataSongs.map((song) => <option key={song.id} value={song.id}>{song.name}</option>)
                    }
                </select>
                <button onClick={handleClick} >Add</button>
            </div>
            <div className='items'>
                {dataSongsByPlaylist && dataSongsByPlaylist.map((song) => 
                  <div className='item' key={song.id} >
                    <span className='itemName'>{song.name}</span>
                    <span className='itemAction' onClick={() => handleDelete(song.id)}>X</span>
                  </div>
                )}
            </div>
        </div>
    );
};

export default SharedPlaylist;