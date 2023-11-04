import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { ActionType } from '../../enums/ActionType';
import { AlbumCustomType, AlbumType } from '../../types/AlbumType';
import { findAlbumById } from '../../services/AlbumService';


type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : AlbumType[],
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    setAction :React.Dispatch<React.SetStateAction<ActionType>>
    setIdentify : React.Dispatch<React.SetStateAction<number | undefined>>
    setAlbum : React.Dispatch<React.SetStateAction<AlbumCustomType | undefined>>
}

const DatatableAlbum = (props : Probs) => {
    
    const handleDelete = (id:number) => {
      console.log(id);
    }
    const handleUpdate = async (id:number) => {
      const album = await findAlbumById(id);
      props.setAlbum(album);
      props.setOpen(true);
      props.setAction(ActionType.UPDATE);
      props.setIdentify(id);
    }
    const actionColumn : GridColDef = {
      field: "action",
      headerName: "Action",
      width: 200 ,
      renderCell: (params) => {
          return (
              <div className="action">
                  <div className="update" onClick={() => handleUpdate(params.row.id)} >
                      <img src="/view.svg" alt=""  />
                  </div>
                  <div className="delete" onClick={() => handleDelete(params.row.id)}>
                      <img src="/delete.svg" alt="" />
                  </div>    
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

export default DatatableAlbum;