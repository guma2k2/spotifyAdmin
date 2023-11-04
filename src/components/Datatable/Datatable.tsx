import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './Datatable.style.scss'
import { ActionType } from '../../enums/ActionType';
import { UserType } from '../../types/UserType';
import { findUserById } from '../../services/UserService';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

type Probs = {
    columns : GridColDef[] ,
    slug: string ,
    rows : UserType[],
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    setAction :React.Dispatch<React.SetStateAction<ActionType>>,
    setIdentify : React.Dispatch<React.SetStateAction<number | undefined>>,
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>,
    totalPage:number,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
    setSortDir:React.Dispatch<React.SetStateAction<string>>,
    setSortField:React.Dispatch<React.SetStateAction<string>>,
    setKeyword: React.Dispatch<React.SetStateAction<string>>,

}

const Datatable = (props : Probs) => {
    const [page, setPage] = useState<number>(1);
    const handleDelete = (id:number) => {
      props.setIdentify(id);
      
    }
    const handleUpdate = async (id:number) => {
      console.log(id);
      const user = await findUserById(id)      ;
      props.setUser(user);
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
    const handleChangePage = (event: React.ChangeEvent<unknown>, pageNum: number) => {
      console.log(pageNum);
      props.setCurrentPage(pageNum);
      setPage(pageNum)
    }
    return (
        <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows= {props.rows}
        columns={[...props.columns, actionColumn]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        getRowId={(row) => row.id || Math.random()}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <Pagination count={props.totalPage} onChange={handleChangePage} page={page} />
    </div>
    );
};

export default Datatable;