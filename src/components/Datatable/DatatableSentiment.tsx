import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { SentimentType } from '../../types/SentimentType';
import { ActionType } from '../../enums/ActionType';
import { deleteById, findById } from '../../services/SentimentService';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    setIdentify:React.Dispatch<React.SetStateAction<number | undefined>>,
    rows : SentimentType[],
    setSentiment:React.Dispatch<React.SetStateAction<SentimentType | undefined>>,
    setAction:React.Dispatch<React.SetStateAction<ActionType>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const DatatableSentiment = (props : Probs) => {

    const handleDelete = (id:number) => {
      console.log(id);
      confirmAlert({
        title: 'Xac nhan',
        message: `Bạn có chắc muốn xóa sentiment#${id} ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
               const res = await deleteById(id);
               alert(res);
            }
          },
          {
            label: 'No'
          }
        ]
      });
    }
    const handleUpdate = async (id:number) => {
      props.setAction(ActionType.UPDATE)
      props.setIdentify(id)
      props.setOpen(true)
      const res = await findById(id);
      if(res) {
        props.setSentiment(res.data)
      }
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