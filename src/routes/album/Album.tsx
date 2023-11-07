import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { ActionType } from "../../enums/ActionType";
import { AlbumCustomType } from "../../types/AlbumType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { findAllAlbum,updateStatus } from "../../services/AlbumService";
import DatatableAlbum from "../../components/Datatable/DatatableAlbum";
import AddAlbum from "../../components/AddCustom/AddAlbum";

import './Album.style.scss'
import ModelUploadImage from "../../components/ModelUploadImage/ModelUploadImage";
const Album = () => {
  const queryClient = useQueryClient();
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "imagePath",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.imagePath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,"image",params.row.imagePath)} />;
      },
      type: "file"
    },
    {
      field: "thumbnailPath",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.thumbnailPath || "/noavatar.png"} alt=""onClick={() => onPreviewImage(params.row.id,"thumbnail",params.row.thumbnailPath)} />;
      },
      type: "file"
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 200,
    },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === true) {
          return <img src="status-enable.svg" alt="" onClick={() => updateStatusAlbum(params.row.id)} />; 
        }
        return  <img src="status-dis.svg" alt="" onClick={() => updateStatusAlbum(params.row.id)} />;
      },
      type: "boolean",
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(ActionType.ADD);
  const [identify, setIdentify] = useState<number>();
  const [album, setAlbum] = useState<AlbumCustomType>();
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("desc");
  const [sortField, setSortField] = useState<string>("id");
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState<string>("");
  const albumQuery = useQuery({
    queryKey: ['album'],
    queryFn: findAllAlbum
  })

  const Albums = albumQuery.data;
  if (albumQuery.isLoading) {
    return <div>Loading...</div>
  }

  const updateStatusAlbum = async (id:number) => {
    const res = await updateStatus(id);
    queryClient.invalidateQueries(['album'])
    console.log(res);
  }

  const onPreviewImage = (id: number, type:string,url:string) => {
    setIdentify(id);
    setType(type);
    setSrc(url);
    setOpenUploadImage(true);
  }
  return (
    <div className="album" >
      <div className="info">
        <h1>Album</h1>
      </div>
      <DatatableAlbum slug="albums" columns={columns} rows={Albums ? Albums : []} setAction={setAction} setOpen={setOpen} setIdentify={setIdentify} setAlbum={setAlbum} />
      {open && <AddAlbum slug="album" setOpen={setOpen} type={action} identify={identify} album={album} />}
      {openUploadImage && <ModelUploadImage
        slug="album"
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
  );
};

export default Album;