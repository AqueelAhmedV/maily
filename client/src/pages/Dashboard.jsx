import { useState } from "react";
import AddClient from "../components/AddClient";
import Table from "../components/Table";
import axios from "axios";
import { routes } from "../constants";
import { tryViewTransition } from "../utils/dom";


const Dashboard = () => {
    const [tableLoading, setTableLoading] = useState(false)
    const [data, setData] = useState([]);

    const fetchData = (user) => {
      tryViewTransition(setTableLoading, true)
        axios.get(`${routes.SERVER_URL}/api/client/list/${user.UserId}`)
        .then((res) => {
          // console.log(res.data)
          console.log(res.data)
          tryViewTransition(setData, res.data)
          tryViewTransition(setTableLoading, false)
        })
        .catch((err) => {
          tryViewTransition(setTableLoading, false)
          if (err.response.status === 404) {
            tryViewTransition(setData, [])
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