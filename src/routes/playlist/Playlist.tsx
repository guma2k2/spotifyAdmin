import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import './Playlist.style.scss'
import AddCustom from "../../components/AddCustom/AddCustom";
import { ActionType } from "../../enums/ActionType";
import DatatablePlaylist from "../../components/Datatable/DatatablePlaylist";
import { useQuery } from "@tanstack/react-query";
import { findAllPlaylist } from "../../services/PlaylistService";
import { PlaylistType } from "../../types/PlaylistType";
import ModelUploadImage from "../../components/ModelUploadImage/ModelUploadImage";
const Playlist = () => {
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
        return <img src={params.row.thumbnailPath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,"thumbnail",params.row.thumbnailPath)}/>;
      },
      type: "file"
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 200,
    }
    ,
    {
      field: "description",
      type: "string",
      headerName: "Description",
      width: 400,
    }

  ];

  const [open, setOpen] = useState<boolean>(false);
  const [identify, setIdentify] = useState<number>();
  const [action, setAction] = useState<ActionType>(ActionType.ADD);
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [src, setSrc] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("desc");
  const [sortField, setSortField] = useState<string>("id");
  const [keyword, setKeyword] = useState<string>("");
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const { isLoading, data, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: findAllPlaylist
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }
  const onPreviewImage = (id: number, type:string, url:string) => {
    setIdentify(id);
    setType(type)
    setSrc(url);
    setOpenUploadImage(true);
  }
  return (
    <div className="playlist">
      <div className="info">
        <h1>Playlist</h1>
        <button onClick={() => { setOpen(true), setAction(ActionType.ADD), setIdentify(undefined), setPlaylist(undefined) }}>Add playlist</button>
      </div>
      <DatatablePlaylist slug="playlis" columns={columns} rows={data ? data : []} setOpen={setOpen} setIdentify={setIdentify} setAction={setAction} setPlaylist={setPlaylist} />
      {open && <AddCustom slug="playlist" setOpen={setOpen} type={action} identify={identify} playlist={playlist} />}
      {openUploadImage && <ModelUploadImage
        slug="playlist"
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

export default Playlist