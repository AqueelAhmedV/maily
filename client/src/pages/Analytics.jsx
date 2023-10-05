import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../constants";

const Analytics = () => {
    const [msg, setMsg] = useState(false)
    useEffect(() => {
        axios.get(`${routes.SERVER_URL}/test`)
        .then((res) => {
            console.log(res)
            setMsg(res.data)
        }).catch(console.log)
    }, [])
    return (
        <div className="h-4/5 w-full justify-center flex items-center">
            <span className="font-semibold text-lg text-gray-200">
                {msg}
            </span>
        </div>
    )
} 