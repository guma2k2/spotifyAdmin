import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { ActionType } from '../../enums/ActionType';
import { CategoryType } from '../../types/CategoryType';
import { findCategoryByID } from '../../services/CategoryService';
import { Link } from 'react-router-dom';


type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : CategoryType[],
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    setAction :React.Dispatch<React.SetStateAction<ActionType>>
    setIdentify : React.Dispatch<React.SetStateAction<number | undefined>>
    setCategory : React.Dispatch<React.SetStateAction<CategoryType | undefined>>
}

const DatatableCategory = (props : Probs) => {

    const handleDelete = (id:number) => {
      console.log(id);
    }
    const handleUpdate = async (id:number) => {
      console.log(id);
      const category = await findCategoryByID(id);
      props.setCategory(category);
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
                  <Link className="modify" to={`/sharedCategory/${params.id}/category`} >
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

export default DatatableCategory;