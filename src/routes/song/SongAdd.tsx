import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './SongAdd.style.scss'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSong } from "../../services/SongService";
import { findAllUser } from "../../services/UserService";
const SongAdd = () => {
    const queryClient = useQueryClient();
    const [lyric, setLyric] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [image, setImage] = useState<File>();
    const [audio, setAudio] = useState<File>();
    const [duration, setDuration] = useState<number>(0);
    const [userId, setUserid] = useState<number>(0);
    const mutation =  useMutation({
        mutationFn: async  () => {
            console.log("asdfasfas");
            var formData = new FormData() ;
            if(image) {
                formData.append("image", image);
            }
            if(audio) {
                formData.append("audio", audio);
            }
            formData.append("name", name);
            formData.append("genre", genre);
            formData.append("lyric", lyric);
            formData.append("userId", userId.toString());
            formData.append("duration", duration.toString());
            return await addSong(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['song']);
            clearInputs();            
        },
        onError: (res) => {
            alert(res);
        }
    })

    const clearInputs = () => {
        setLyric("");
        setName("");
        setGenre("");
        setImage(undefined);
        setAudio(undefined);
        setDuration(0);
        setUserid(0);
    }
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: findAllUser
    })
    if(userQuery.isLoading) {
        return <div>Loading...</div>
    }
    const usersData = userQuery.data;
    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
          setImage(files[0]) ;
        }
    }
    const handleChangeAudio = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
            setAudio(files[0]) ;
        }
    }
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutation.mutate();

    }
    const handleChangeUser = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setUserid(parseInt(e.target.value));
    }
    const handleChangeGenre = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    }
    return <div className="songAdd" >
        <div className="title">
            <span>Song</span>
        </div>
        <form className="items">
            <div className='item'>
                <label>Image</label>
                <input type="file" onChange={handleChangeImage} />
            </div>
            <div className='item'>
                <label>Audio</label>
                <input type="file" onChange={handleChangeAudio} />
            </div>
            <div className='item'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='item'>
                <label>Duration</label>
                <input type="number" value={duration} onChange={(e) => {
                    setDuration(parseInt(e.target.value))
                    console.log(parseInt(e.target.value));
                }} required />
            </div>
            <div className='item'>
                <label>Genre</label>
                <select onChange={handleChangeGenre} value={genre} >
                    <option value="POP" >POP</option>
                    <option value="CLASSICAL" >CLASSICAL</option>
                    <option value="Rock" >Rock</option>
                    <option value="Hip_Hop" >Hip_Hop</option>
                </select>
            </div>
            <div className='item'>
                <label>User</label>
                <select onChange={handleChangeUser} value={userId} >
                    {usersData && usersData.map((user) => <option key={user.id} value={user.id} >{user.fullName}</option>)}
                </select>
            </div>
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={lyric} onChange={setLyric} />
            </div>
            <button onClick={handleSubmit} >Submit</button>
            
        </form>
    </div>;
}
export default SongAdd