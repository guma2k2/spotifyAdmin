import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import './Category.style.scss'
import { ActionType } from "../../enums/ActionType";
import { CategoryType } from "../../types/CategoryType";
import DatatableCategory from "../../components/Datatable/DatatableCategory";
import AddCustomCategory from "../../components/AddCustom/AddCustomCategory";
import { useQuery } from "@tanstack/react-query";
import { findAllCategory,updateStatus} from "../../services/CategoryService";
import ModelUploadImage from "../../components/ModelUploadImage/ModelUploadImage";



const Category = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "imagePath",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.imagePath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,"image")} />;
      },
      type: "file"
    },
    {
      field: "thumbnailPath",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.thumbnailPath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,"thumbnail")}/>;
      },
      type: "file"
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 400,
    },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === true) {
          return <img src="status-enable.svg" alt="" onClick={() => updateStatusCate(params.row.id)} />; 
        }
        return  <img src="status-dis.svg" alt="" onClick={() => updateStatusCate(params.row.id)} />;
      },
      type: "boolean",
    },

  ];
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(ActionType.ADD);
  const [identify, setIdentify] = useState<number>();
  const [category, setCategory] = useState<CategoryType>();
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("desc");
  const [sortField, setSortField] = useState<string>("id");
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { isLoading, data, error } = useQuery({
    queryKey: ['category'],
    queryFn: findAllCategory
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }

  const updateStatusCate = (id:number) => {
    const res = updateStatus(id);
    console.log(res);
  }

  const onPreviewImage = (id: number, type:string) => {
    setType(type);
    setIdentify(id);
    setSrc(`http://localhost:8080/api/v1/category/view/${type}/${id}`);
    setOpenUploadImage(true);
  }
  return (
    <div className="category">
      <div className="info">
        <h1>Category</h1>
        <button onClick={() => { setOpen(true), setAction(ActionType.ADD), setIdentify(undefined), setCategory(undefined) }}>Add category</button>
      </div>
      <DatatableCategory slug="users" columns={columns} rows={data ? data : []} setAction={setAction} setOpen={setOpen} setIdentify={setIdentify} setCategory={setCategory} />
      {open && <AddCustomCategory slug="category" setOpen={setOpen} type={action} identify={identify} category={category} />}
      {openUploadImage && <ModelUploadImage
        slug="category"
        src={src}
        id={identify}
        setOpenUploadImage={setOpenUploadImage}
        type={type}
        currentPage={currentPage}
        sortDir={sortDir}
        sortField={sortField}
        keyword={keyword}
      />}
    </div>
  )
}
export default Category