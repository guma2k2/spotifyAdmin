import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { findAllSong,updateStatus } from "../../services/SongService";
import DatatableSong from "../../components/Datatable/DatatableSong";
import './Song.style.scss'
import { useState } from "react";
import ModelUploadImage from "../../components/ModelUploadImage/ModelUploadImage";

const Song = () => {
  const [src, setSrc] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("desc");
  const [sortField, setSortField] = useState<string>("id");
  const [keyword, setKeyword] = useState<string>("");
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);
  const [identify, setIdentify] = useState<number>();
  const [type,setType] = useState<string>("");
  const columnsTable: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.imagePath || "/noavatar.png"} alt="" onClick={() => onPreviewImage(params.row.id,"image",params.row.imagePath )} />;
      },
      type: "file"
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 150,
    },
    {
      field: "genre",
      type: "string",
      headerName: "Genre",
      width: 150,
    },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === true) {
          return <img src="status-enable.svg" alt="" onClick={() => updateStatusSong(params.row.id)} />; 
        }
        return  <img src="status-dis.svg" alt="" onClick={() => updateStatusSong(params.row.id)} />;
      },
      type: "boolean",
    },
  ];
  const songQuery = useQuery({
    queryKey: ['song'],
    queryFn: findAllSong
  })
  const songsData = songQuery.data;
  if (songQuery.isLoading) {
    return <div>
      Loading..,
    </div>
  }
  const updateStatusSong = (id:number) => {
    const res = updateStatus(id);
    console.log(res);
  }
  const onPreviewImage = (id: number, type:string, imagePath:string) => {
    setType(type);
    setIdentify(id);
    setSrc(imagePath);
    setOpenUploadImage(true);
  }
  return (
    <div className="song">
      <div className="info">
        <h1>Songs</h1>
        <Link to="/song/add" className="actionAdd" >
          <button >Add song</button>
        </Link>
      </div>
      <DatatableSong slug="Song" columns={columnsTable} rows={songsData ? songsData : []} />
      {openUploadImage && <ModelUploadImage
        slug="song"
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

export default Song;