import './AddCustom.style.scss'
import { ActionType } from '../../enums/ActionType'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {AlbumRequest, AlbumCustomType } from '../../types/AlbumType'
import {findAllUser} from'../../services/UserService'
import { uploadFile,addAlbum, updateAlbum } from '../../services/AlbumService'
type Props = {
    slug : string
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    type : ActionType
    identify?: number
    album?:AlbumCustomType
}

const AddAlbum = (props:Props) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState<File>();
    const [thumbnail, setThmubnail] = useState<File>();
    const [name, setName] = useState<string>("") ;
    const [userSelection, setUserSelection] = useState<number | undefined>(props.album?.user.id);
    const mutation =  useMutation({
        mutationFn: async  () => {
            // console.log("asdfasfas");
            var formData = new FormData() ;
            if(image) {
                formData.append("image", image);
            }

            if(thumbnail) {
                formData.append("thumbnail", thumbnail);
            }
            const album:AlbumRequest = {
                name
            }
            let status = 404  ;
            let albumIdResponse = 0 ;
            if(props.identify) {
                let albumId = props.identify;
                const res =  await updateAlbum(album,albumId);
                albumIdResponse = res.data;
                status = res.status;
            }else {
                const res =  await addAlbum(album,userSelection);
                status = res.status;
                albumIdResponse = res.data;
            }
            if(status === 200) {
                return await uploadFile(albumIdResponse,formData);
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries(['album']);
            props.setOpen(false);
        },
        onError: (res) => {
            alert(res);
        }
    })
    
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: findAllUser
    })

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
          setImage(files[0]) ;
        }
    }

    const handleChangeThumbnail = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
           setThmubnail(files[0]) ;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    }

    const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        const userId = parseInt(e.target.value);
        setUserSelection(userId);
    }
    
    useEffect(() => {
        if (props.album) {
            console.log(props.album);
            setName(props.album.name);
    }}, [props.album]); 

    return (
        <div className='addCustom'>
            <div className="modal">
                <div className="modal-top">
                    <div className="title">{ActionType[props.type]} {props.slug} {props.identify}</div>
                    <span className='close' onClick={handleClose} >X</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Image</label>
                        <input  type= "file" onChange={handleChangeImage}   />
                    </div>
                    <div className='item'>
                        <label>Thumbnail</label>
                        <input  type= "file" onChange={handleChangeThumbnail} />
                    </div>
                    <div className='item'>
                        <label>Name</label>
                        <input type= "text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className='userSelection'>
                        <label>User</label>
                        <select value={userSelection} onChange={handleChangeUser} >
                            {userQuery.data && userQuery.data.map((user) =>  <option key={user.id} value={user.id} >{user.fullName}</option>)}
                        </select>
                    </div>

                    <button >Submit</button>
                </form>
                <div className='modal-bottom' onClick={handleClose} >
                    <span>X</span>
                    <span>Close</span>
                </div>
            </div>
        </div>
    );
};

export default AddAlbum;