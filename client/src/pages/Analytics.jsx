import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { routes } from "../constants";
import UserContext from "../contexts/UserContext";

const Analytics = () => {
    const [filterFn, setFilterFn] = useState(() => {})
    const {user, setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        if(!user.UserId) return
        setLoading(true)
        axios.get(`${routes.SERVER_URL}/api/analytics/list/${user.UserId}`)
        .then((res) => {
            setLoading(false)
            console.log(res.data)
            setData(res.data)
            
        })
        .catch((err) => {
            if (err.response.status === 404) 
                setData([])
            setLoading(false);
            console.log(err)
        })
    }, [user])
    return (
        <div className="h-4/5 w-full justify-center flex items-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between pb-4 ">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="outline-none block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Content
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Views
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Recipients
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Read
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((d) => (<tr key={d.MailId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {d.Subject}
                            </th>
                            <td className="px-6 py-4">{d.MailBody}...</td>
                            <td className="px-6 py-4">{d.Views}</td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>




        </div>
    )
}

export default Analytics;