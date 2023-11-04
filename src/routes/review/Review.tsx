import { GridColDef } from "@mui/x-data-grid";
import './Review.style.scss'
import DatatableReview from "../../components/Datatable/DatatableReview";
import { useQuery } from "@tanstack/react-query";
import { findAllReview, updateStatus } from "../../services/ReviewService";


const Review = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "createdAt",
      type: "string",
      headerName: "CreatedAt",
      width: 200,
    },
    {
      field: "content",
      type: "string",
      headerName: "content",
      width: 200,
    },
    {
      field: "username",
      type: "string",
      headerName: "username",
      width: 200,
      renderCell: (params) => {
        return  <span>{params.row.user.fullName}</span>
      },
    },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === true) {
          return <img src="status-enable.svg" alt="" onClick={() => updateStatusReview(params.row.id)} />; 
        }
        return  <img src="status-dis.svg" alt="" onClick={() => updateStatusReview(params.row.id)} />;
      },
      type: "boolean",
    },

  ];
  const updateStatusReview = (id:number) => {
    const res = updateStatus(id);
    console.log(res);
  }
  const { isLoading, data, error } = useQuery({
    queryKey: ['review'],
    queryFn: findAllReview
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }
  return (
    <div className="review">
      <div className="info">
        <h1>Review</h1>
      </div>
      <DatatableReview slug="reviews" columns={columns} rows={data ? data : []} />
    </div>
  )
}
export default Review