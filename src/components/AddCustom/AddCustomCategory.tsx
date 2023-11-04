import './AddCustom.style.scss'
import { ActionType } from '../../enums/ActionType'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoryType } from '../../types/CategoryType'
import { addCategory, findAllCategoryParent, updateCategory } from '../../services/CategoryService'
type Props = {
    slug : string
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    type : ActionType
    identify?: number
    category?:CategoryType
}

const AddCustomCategory = (props:Props) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState<File>();
    const [thumbnail, setThmubnail] = useState<File>();
    const [title, setTitle] = useState<string>("") ;
    const [categoryParentTitle, setCategoryParentTitle] = useState<string>("");
    const mutation =  useMutation({
        mutationFn: async  () => {
            console.log("asdfasfas");
            var formData = new FormData() ;
            if(image) {
                formData.append("image", image);
            }

            if(thumbnail) {
                formData.append("thumbnail", thumbnail);
            }
            formData.append("title", title);
            if(categoryParentTitle){
                formData.append("categoryParentTitle" , categoryParentTitle);
            }
            if(props.identify) {
                return await updateCategory(formData,props.identify);
            }
            return await addCategory(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['category']);
            props.setOpen(false);
        },
        onError: (res) => {
            alert(res);
        }
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
    useEffect(() => {
        if (props.category) {
            console.log(props.category);
            setTitle(props.category.title);
            setCategoryParentTitle(props.category.categoryParentTitle);
    }}, [props.category]); 

    const {isLoading, data , error} = useQuery({
        queryKey: ['category',"allParent"],
        queryFn: findAllCategoryParent
      })
      
      if(isLoading) {
        return <div>Loading...</div>
      }

      if(error) {
        return <div>Error...</div>
      }
    const handleChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setCategoryParentTitle(e.target.value);
    }
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
                        <input type= "text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className='selectParent' >
                        <label>Category parent</label>
                        <select value={categoryParentTitle?categoryParentTitle:""} onChange={handleChangeSelection}>
                            <option></option>
                            {data && data.map(cat => <option key={cat.id} value={cat.title} >{cat.title}</option>)}
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

export default AddCustomCategory;