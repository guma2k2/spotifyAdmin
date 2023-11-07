import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { ActionType } from '../../enums/ActionType';
import { PlaylistType } from '../../types/PlaylistType';
import { findPlaylistById } from '../../services/PlaylistService';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : PlaylistType[],
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    setAction :React.Dispatch<React.SetStateAction<ActionType>>
    setIdentify : React.Dispatch<React.SetStateAction<number | undefined>>
    setPlaylist : React.Dispatch<React.SetStateAction<PlaylistType | undefined>>
}

const DatatablePlaylist = (props : Probs) => {

    const handleDelete = (id:number) => {
      console.log(id);
      confirmAlert({
        title: 'Xac nhan',
        message: `Bạn có chắc muốn xóa playlist#${id} ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => alert('Click Yes')
          },
          {
            label: 'No'
          }
        ]
      });
      props.setIdentify(id);
    }

    const handleUpdate = async (id:number) => {
      console.log(id);
      const playlist = await findPlaylistById(id);
      props.setPlaylist(playlist);
      props.setOpen(true);
      props.setAction(ActionType.UPDATE);
      props.setIdentify(id);
    }
    const actionColumn : GridColDef = {
      field: "action",
      headerName: "Action",
      width: 300 ,
      renderCell: (params) => {
          return (
              <div className="action">
                  <div className="update" onClick={() => handleUpdate(params.row.id)} >
                      <img src="/view.svg" alt=""  />
                  </div>
                  <div className="delete" onClick={() => handleDelete(params.row.id)}>
                      <img src="/delete.svg" alt="" />
                  </div>   
                  <Link className="modify" to={`/shared/${params.id}/playlist`} >
                      <img src="/plus.svg" alt="" />
                  </Link>                
              </div>
          )
      }
  }
    return (
        <div className="dataTable">
          <DataGrid
            className="dataGrid"
            rows={props.rows}
            columns={[...props.columns, actionColumn]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
      </div>
    );
};

export default DatatablePlaylist;