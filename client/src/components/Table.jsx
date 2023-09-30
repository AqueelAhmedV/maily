import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";

const Table = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState([]);
  
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true)
    axios.get(`${routes.SERVER_URL}/api/mail/list`)
    .then((res) => {
      setData(res.data.clients)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [data.length===0])

  const handleSend = (e) => {
    console.log("redirecting to mail editor");
    navigate("/send-mail", {
      state: { persons: data[parseInt(e.target.id) - 1], massMail: false },
    });
  };

  const handleSelect = (e) => {
    setSelected((e.target.checked)?(selected.includes(parseInt(e.target.id)))?selected:[...selected, parseInt(e.target.id)]:selected.filter((s,i)=> s !== parseInt(e.target.id)))
    console.log('selected')
  }

  const handleMassSend = () => {
    console.log("redirecting to mail editor (mass mail mode)");
    console.log(selected)
    navigate("/send-mail", {
      state: { persons: data.filter((r,i) => selected.includes(r.id)), massMail: true },
    });
  };

  const handleDelete = (e) => {
    console.log("deleted");
    setData(data.filter((d, i) => d.id !== parseInt(e.target.id)));
    
  };


  const handleAddClient = (e) => {
    e.preventDefault()
    const [{value: newName},{value: newEmail}] = e.target.elements
    // errors yet to be implemented so erraneous entries prevented
    setData((newEmail && newName && data.filter((d,i) => d.email===newEmail).length===0)?
    [...data, {
        id: data.length+1,
        name: newName,
        email: newEmail}]:data)
  }

  // useEffect(() => {
  //   fetchData();
  // }, [data.length === 0]);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center -translate-y-10'>
      { data.length === 0 ? (
        <div
          className="w-1/3 -translate-y-3 bg-blue-100 rounded border border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">No data available</p>
          <p className="text-sm">
            Click the refresh button below to check for data.
          </p>
          <button
            onClick={fetchData}
            className=" mt-3 w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="max-w-500 p-4 flex justify-center items-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-col">
            <div className=" w-full">
            <form onSubmit={handleAddClient} className="flex justify-between">
            <input
            type="text"
            placeholder="Full Name"
            className="pl-2 mx-1 my-2 rounded w-2/6 relative m-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
            <input
            type="email"
            placeholder="example@mail.com"
            className="pl-2 mx-1 my-2 w-3/6 relative m-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
            <button className="mx-1 my-2 h-fit w-1/6 relative m-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Add client</button>
            </form>
            </div>
            {loading ? (
        <div className="w-full h-full flex items-center justify-center"><i className="fas fa-spin fa-spinner fa-2x h-fit"></i>
      </div>) :<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Send
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((s, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </td>
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">{s.email}</td>
                    <th className="px-6 py-4">
                      <button
                        onClick={handleSend}
                        id={s.id}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Send Mail
                      </button>
                    </th>
                    <th className="px-6 py-4">
                      {deleting ? (
                        <i className="fas fa-spin fa-spinner h-fit"></i>
                      ) : (
                        <button
                          onClick={handleDelete}
                          id={s.id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        defaultValue={false}
                        
                        id={s.id}
                        className="translate-x-full mt-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelect}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
            {(selected.length>1)?
          <div className="flex justify-end p-2 ">
            <button onClick={handleMassSend} className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Bulk Mail
        </button>
          </div>:<></>}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Table;
