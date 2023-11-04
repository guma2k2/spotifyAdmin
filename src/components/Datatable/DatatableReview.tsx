import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { ReviewType } from '../../types/ReviewType';
import { SentimentType } from '../../types/SentimentType';
import { saveSentiment } from '../../services/SentimentService';


type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : ReviewType[],
}

const DatatableReview = (props : Probs) => {

    const handleDelete = (id:number) => {
      console.log(id);
    }
    const handleUpdate = async (id:number) => {
      console.log(id);
    }
    const handleTrain = async (content:string, label:string) => {
      const request:SentimentType = {
        text:content,
        sentiment:label
      }
      const res = await saveSentiment(request);
      console.log(res);
      alert(res);
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
                  <div className="delete" onClick={() => handleTrain(params.row.content, params.row.label)}>
                      <img src="/plus.svg" alt="" />
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

export default DatatableReview;