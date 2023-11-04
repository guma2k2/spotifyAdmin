import { GridColDef } from '@mui/x-data-grid';
import './AddModel.scss'
import { ActionType } from '../../enums/ActionType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, findAllRole, updateUser, uploadImage } from '../../services/UserService';
import { useEffect, useState } from 'react';
import { UserRequest, UserType } from '../../types/UserType';

type Prob = {
    slug: string,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    columns : GridColDef[],
    type : ActionType,
    id?:number,
    user?: UserType
}
const AddModel = (props: Prob) => {
    const queryClient = useQueryClient();
    const [firstName, setFirstName] = useState<string>("") ;
    const [lastName, setLastName] = useState<string>("") ;
    const [email, setEmail] = useState<string>("") ;
    const [password, setPassword] = useState<string>("") ;
    const [photoImage, setPhotoImage] = useState<string>("");
    const [photo, setPhoto] = useState<File>();
    const [roleName, setRoleName] = useState<string>() ;
    const [gender,setGender] = useState<string>("MALE");
    const mutation =  useMutation({
        mutationFn: async  () => {

            const request:UserRequest = {
                firstName,
                lastName,
                email,
                password,
                gender,
                roleName:roleName?roleName :""
            }
            var formData = new FormData() ;
            
            let status = 404  ;
            let userIdResponse = 0 ;
            if(props.id) {
                let userId = props.id;
                const res =  await updateUser(request,userId);
                if(res && res.status === 200) {
                    userIdResponse = res.data.id;
                }
                status = res.status;
            } else {
                const res =  await addUser(request);
                status = res.status;
                if(res && res.status === 200) {
                    userIdResponse = res.data.id;
                }
            }
            if(photo) {
                formData.append("image", photo);
                return uploadImage(formData,userIdResponse);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            props.setOpen(false);
        }
    })
    

    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
          setPhoto(files[0]) ;
        }
    }
    useEffect(() => {
    if (props.user) {
        setFirstName(props.user.firstName);
        setLastName(props.user.lastName);
        setEmail(props.user.email);
        setPhotoImage(props.user.photoImagePath);
        setRoleName(props.user.role?.name)
        setGender(props.user.gender);
    }
    }, [props.user]); 

    

    const {isLoading, data, error} = useQuery({
        queryKey:['role'],
        queryFn: findAllRole
    })

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(error) {
        console.log(error);
        alert(error);
    }

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
        props.setOpen(false);
    } 
    const handleChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setRoleName(e.target.value);
    }

    return (
        <div className='add'>
            <div className="modal">
                <span className='close' onClick={() => props.setOpen(false)}>X</span>
                <h1>{ActionType[props.type]} {props.slug} {props.id?props.id:''}</h1>
                <form onSubmit={handleSubmit}>
                        <div className='item' >
                            <label>First name</label>
                            <input type= "text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='item' >
                            <label>Last name</label>
                            <input type= "text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className='item' >
                            <label>Email</label>
                            <input type= "email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='item' >
                            <label>Password</label>
                            <input  type= "password" min={8} value={password} onChange={(e) => setPassword(e.target.value)}  />
                        </div>
                        <div className='item' >
                            <label>Photo</label>
                            <input  type= "file" onChange={handleChange} />
                        </div>
                        <div className='item' >
                            <label>Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} >
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>
                        {photoImage && <img className='photo' src={photoImage} />}
                        <div className='roleSelection' >
                            <label>Role</label>
                            <select value={roleName} onChange={handleChangeSelection} >
                                {data && data.map(role => <option key={role.id}>{role.name}</option> )}
                            </select>
                        </div>
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default AddModel;