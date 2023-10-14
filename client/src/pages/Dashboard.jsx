import { useState } from "react";
import AddClient from "../components/AddClient";
import Table from "../components/Table";
import axios from "axios";
import { routes } from "../constants";


const Dashboard = () => {
    const [tableLoading, setTableLoading] = useState(false)
    const [data, setData] = useState([]);

    const fetchData = (user) => {
        setTableLoading(true)
        axios.get(`${routes.SERVER_URL}/api/client/list/${user.UserId}`)
        .then((res) => {
          // console.log(res.data)
          console.log(res.data)
          setData(res.data)
          setTableLoading(false)
        })
        .catch((err) => {
          setTableLoading(false)
          if (err.response.status === 404) {
            setData([])
          }
        })
      }
    return (
        <>
        <AddClient fetchData={fetchData}/>
        <Table fetchData={fetchData} loading={tableLoading} data={data}/>
        </>
    );
}

export default Dashboard