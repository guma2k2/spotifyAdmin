import { GridColDef } from "@mui/x-data-grid";
import './Sentiment.style.scss'
import { useQuery } from "@tanstack/react-query";
import { findAllSentiment, trainData } from "../../services/SentimentService";
import DatatableSentiment from "../../components/Datatable/DatatableSentiment";


const Sentiment = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "text",
      type: "string",
      headerName: "text",
      width: 200,
    },
    {
        field: "sentiment",
        type: "string",
        headerName: "sentiment",
        width: 200,
      },
  ];
  const { isLoading, data, error } = useQuery({
    queryKey: ['sentiment'],
    queryFn: findAllSentiment
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }
  const handleClick = async () => {
    const res = await trainData();
    console.log(res);
    alert("The accuracy of training is " + res );
  }
  return (
    <div className="sentiment">
      <div className="info">
        <h1>Sentiment</h1>
        <button onClick={handleClick}>Train data</button>
      </div>
      <DatatableSentiment slug="sentiments" columns={columns} rows={data ? data : []} />
    </div>
  )
}
export default Sentiment