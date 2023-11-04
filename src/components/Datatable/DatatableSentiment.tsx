import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { SentimentType } from '../../types/SentimentType';


type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : SentimentType[],
}

const DatatableSentiment = (props : Probs) => {

    const handleDelete = (id:number) => {
      console.log(id);
    }
    const handleUpdate = async (id:number) => {
      console.log(id);
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

export default DatatableSentiment;