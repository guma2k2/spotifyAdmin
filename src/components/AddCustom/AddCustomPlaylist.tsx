import './AddCustom.style.scss'
import { ActionType } from '../../enums/ActionType'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPlaylist, updatePlaylist } from '../../services/PlaylistService'
import { PlaylistType } from '../../types/PlaylistType'
type Props = {
    slug : string
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    type : ActionType
    identify?: number
    playlist?:PlaylistType
}

const AddCustom = (props:Props) => {
    const queryClient = useQueryClient();
    const [description, setDescription] = useState<string>("") ;
    const [name, setName] = useState<string>("") ;
    const mutation =  useMutation({
        mutationFn: async  () => {
            console.log("asdfasfas");
            var formData = new FormData() ;

            formData.append("name", name);
            formData.append("description" , description);
            if(props.identify) {
                return await updatePlaylist(formData,props.identify);
            }
            return await addPlaylist(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['playlist']);
            props.setOpen(false);
        },
        onError: (res) => {
            alert(res);
        }
    })
    
    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    }
    useEffect(() => {
        if (props.playlist) {
            console.log(props.playlist);
            setName(props.playlist.name);
            setDescription(props.playlist.description);
    }}, [props.playlist]); 
    return (
        <div className='addCustom'>
            <div className="modal">
                <div className="modal-top">
                    <div className="title">{ActionType[props.type]} {props.slug} {props.identify}</div>
                    <span className='close' onClick={handleClose} >X</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Name</label>
                        <input type= "text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='item'>
                    <label>Description</label>
                        <input type= "text" value={description} onChange={(e) => setDescription(e.target.value)} required />
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

export default AddCustom;