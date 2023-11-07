import { GridColDef } from '@mui/x-data-grid';
import './AddModel.scss'
import { ActionType } from '../../enums/ActionType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, findAllRole, updateUser,  } from '../../services/UserService';
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
    const [roleName, setRoleName] = useState<string>() ;
    const [gender,setGender] = useState<string>("MALE");
    const [day,setDay] = useState<number>(1);
    const [month,setMonth] = useState<number>(1);
    const [year,setYear] = useState<number>(2023);
    const mutation =  useMutation({
        mutationFn: async  () => {
            const request:UserRequest = {
                firstName,
                lastName,
                email,
                password,
                gender,
                day,
                month,
                year,
                roleName:roleName?roleName :""
            }

            if(props.id) {
                let userId = props.id;
                return  await updateUser(request,userId);
            } 
            return  await addUser(request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user',1,"desc","id",""]);
            props.setOpen(false);
        }
    })
    
   
    useEffect(() => {
    if (props.user) {
        const dateParts = props.user.dateOfBrith.split('/');
        setFirstName(props.user.firstName);
        setLastName(props.user.lastName);
        setEmail(props.user.email);
        setRoleName(props.user.role?.name)
        setGender(props.user.gender);
        setDay(parseInt(dateParts[0], 10));
        setMonth(parseInt(dateParts[1], 10));
        setYear(parseInt(dateParts[2], 10));
        
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
                            <label>Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} >
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>
                        <div className='item-date' >
                            <label>Date of birth</label>
                            <input value={day} type='number' placeholder='day' min={1} max={31} onChange={(e) => setDay(parseInt(e.target.value))} />
                            <input value={month} type="number" placeholder='month' min={1} max={12} onChange={(e) => setMonth(parseInt(e.target.value))} />
                            <input value={year} type="number" placeholder='year' onChange={(e) => setYear(parseInt(e.target.value))}  />
                        </div>
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