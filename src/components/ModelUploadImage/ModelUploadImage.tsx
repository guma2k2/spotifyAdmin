import { useEffect, useState } from "react";
import './ModelUploadImage.style.scss'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../../services/UtityService";
type Props = {
    src: string
    slug: string
    id?:number
    setOpenUploadImage:  React.Dispatch<React.SetStateAction<boolean>>
    type:string
    currentPage:number
    sortDir:string
    sortField:string
    keyword:string
}
const ModelUploadImage = (props: Props) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>(props.src);

    const mutation =  useMutation({
        mutationFn: async  () => {
            var formData = new FormData() ;
            if(image){
                formData.append(props.type, image);
                const url = `/${props.slug}/upload/${props.type}/${props.id}`;
                console.log(url);
                return await uploadImage(url,formData);
            }
            
        },
        onSuccess: () => {
            queryClient.invalidateQueries([props.slug]);
            props.setOpenUploadImage(false);
        }

        // , props.currentPage, props.sortDir, props.sortField, props.keyword
    })

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        }
    }, [image])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPreview(URL.createObjectURL(file));
            setImage(file);
        }
    }
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) =>   {
        e.preventDefault();
        mutation.mutate();
    }

    const handleClose = () => {
        props.setOpenUploadImage(false);
    }
    return (
        <div className="uploadImage">
            <div className="modelUploadImage">
                <span onClick={handleClose} className='close'>X</span>
                <h1>Upload {props.type} {props.slug} {props.id}</h1>
                <input type="file" onChange={handleChange} />
                <img src={preview} />
                <button onClick={handleClick}>Upload</button>
            </div>
        </div>
    );
};

export default ModelUploadImage;