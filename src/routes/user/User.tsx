import {  useState } from "react"
import AddModel from "../../components/AddModel/AddModel";
import { GridColDef } from "@mui/x-data-grid";
import Datatable from "../../components/Datatable/Datatable";
import './User.style.scss'
import { ActionType } from "../../enums/ActionType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listAllPage,updateStatus } from "../../services/UserService";
import { UserType } from "../../types/UserType";
import ModelUploadImage from "../../components/ModelUploadImage/ModelUploadImage";
const User = () => {
  const queryClient = useQueryClient();
  // Todo : fetch data user 
  const columnsTable: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "photo",
      headerName: "Photo",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.photoImagePath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,params.row.photoImagePath)} />;
      },
      type: "file"
    },
    {
      field: "firstName",
      type: "string",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      type: "string",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
    },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === true) {
          return <img src="status-enable.svg" alt="" onClick={() => updateStatusUser(params.row.id)} />; 
        }
        return  <img src="status-dis.svg" alt="" onClick={() => updateStatusUser(params.row.id)} />;
      },
      type: "boolean",
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);

  const [src, setSrc] = useState<string>("");
  const [action, setAction] = useState<ActionType>(ActionType.ADD);

  const [identify, setIdentify] = useState<number>();

  const [user, setUser] = useState<UserType>();


  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("desc");
  const [sortField, setSortField] = useState<string>("id");
  const [keyword, setKeyword] = useState<string>("");



  const userAllPage = useQuery(
    {
      queryKey: ['user', currentPage, sortDir, sortField, keyword],
      queryFn: () => listAllPage(currentPage, sortDir, sortField, keyword)
    }
  );
  const onPreviewImage = (id: number,photoImagePath:string) => {
    setIdentify(id);
    setSrc(photoImagePath);
    setOpenUploadImage(true);
  }
  const updateStatusUser = async (id:number) => {
    const res = await  updateStatus(id);
    console.log(res);
    alert(res.data);
    queryClient.invalidateQueries(['user',1,"desc","id",""]);
  }


  if (userAllPage.isLoading) {
    return <div >
      Loading...
    </div>
  }
  if (userAllPage.error) {
    return <div>Error</div>
  }

  if (userAllPage.isSuccess) {
    const data = userAllPage.data;
    console.log(data);
  }


  return (
    <div className="user" >
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => { setOpen(true), setAction(ActionType.ADD), setIdentify(undefined), setUser(undefined) }}>Add user</button>
      </div>
      <Datatable slug="USER" columns={columnsTable}
        rows={userAllPage.data ? userAllPage.data.content : []}
        setOpen={setOpen}
        setAction={setAction}
        setIdentify={setIdentify}
        setUser={setUser}
        totalPage={userAllPage.data ? userAllPage.data.totalPage : 0}
        setCurrentPage={setCurrentPage}
        setSortDir={setSortDir}
        setSortField={setSortField}
        setKeyword={setKeyword}
      />
      {open && <AddModel slug="user" setOpen={setOpen} columns={columnsTable} type={action} id={identify} user={user} />}
      {openUploadImage && <ModelUploadImage
        slug="user"
        src={src}
        id={identify}
        setOpenUploadImage={setOpenUploadImage}
        type="image"
        currentPage={currentPage}
        sortDir={sortDir}
        sortField={sortField}
        keyword ={keyword}
      />}
    </div>
  )
}

export default User