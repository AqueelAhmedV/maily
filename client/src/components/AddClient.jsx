import {useState, useContext} from "react"
import { Button } from "./common/Button"
import axios from "axios"
import { routes } from "../constants"
import UserContext from "../contexts/UserContext"


const AddClient = ({ setClients }) => {
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    const handleAddClient = (e) => {
        e.preventDefault()
        setLoading(true)
        const [{value: fName}, {value: lName},{value: email}] = e.target.elements
        // errors yet to be implemented so erraneous entries prevented
        console.log(user, fName, lName, email)
        axios.post(`${routes.SERVER_URL}/api/client/add`, {
            FirstName: fName,
            LastName: lName,
            Email: email,
            UserId: user.UserId
        }).then((res) => {
            console.log(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
      }

    return (
        <div className=" w-full h-min">
            <form onSubmit={handleAddClient} className="flex justify-between">
            <input
            type="text"
            placeholder="First Name"
            className="pl-2 mx-1 my-2 rounded w-2/6 relative m-0 flex-auto text-white rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
            <input
            type="text"
            placeholder="Last Name"
            className="pl-2 mx-1 my-2 rounded w-2/6 relative m-0 flex-auto text-white rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600  focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
            <input
            type="email"
            placeholder="example@mail.com"
            className="pl-2 mx-1 my-2 w-3/6 relative m-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
            <Button text="Add client" loading={loading} />
            </form>
        </div>
    )
}

export default AddClient