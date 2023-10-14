import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes, testUser } from "../constants";
import { flushSync } from "react-dom";
import UserContext from "../contexts/UserContext";
import Spinner from "./Spinner";


const Table = ({ fetchData, loading, data }) => {
  const {user, setUser} = useContext(UserContext);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState([]);
  
  const navigate = useNavigate();

  

  useEffect(() => {
    if (user.UserId)
    fetchData(user)
  }, [user])

  // Server-Side Events implementation
  // const opHandlers = {
  //   create: ((evt) => {
  //     // console.log(evt)
      
  //     setData((prev) => ([...prev, JSON.parse(evt.Data)]))
  //     setLoading(false)
  //   }),
  //   destroy: ((evt) =>  {
  //     setData((prev) => (prev.filter(d => d.ClientId !== evt.RecordPk)))
  //     // setLoading(false)
  //   })
  // }   

  // useEffect(() => {
  //   if (!user.UserId) return;
  //   let clientStream; 
  //   if ('EventSource' in window) {
  //     setLoading(true)
  //     clientStream = new EventSource(`${routes.SERVER_URL}/api/client/stream/${user.UserId}`)
  //     clientStream.onmessage = (e) => {
  //       e.preventDefault()
  //       let evt = JSON.parse(e.data)
  //       console.log(evt, new Date())
  //       // console.log(msg)
  //       opHandlers[evt.Operation](evt)
  //       // fetchData()
  //     }
  //   }
  //   return () => {
  //     if (clientStream)
  //     clientStream.close()
  //   }
  // }, [user])


  const handleSend = (e) => {
    console.log("redirecting to mail editor");
    if (document.startViewTransition) {
      console.log("yes")
      // console.log(data)
      document.startViewTransition(() => {
        console.log("vT")
        flushSync(() => {
          navigate("/send-mail", {
            state: { persons: data.filter(d => d.ClientId===e.target.id), massMail: false },
          });
        })    
      })
    }else
    navigate("/send-mail", {
      state: { persons: data.filter(d => d.ClientId===e.target.id), massMail: false },
    });
  };

  const handleSelect = (e) => {
    setSelected((e.target.checked)?(selected.includes(e.target.id))?selected:[...selected, e.target.id]:selected.filter((s,i)=> s !== e.target.id))
    console.log('selected')
  }

  const handleMassSend = () => {
    console.log("redirecting to mail editor (mass mail mode)");
    console.log(selected)
    navigate("/send-mail", {
      state: { persons: data.filter((r,i) => selected.includes(r.ClientId)), massMail: true },
    });
  };

  const handleDelete = (e) => {
    console.log("deleted");
    axios.post(`${routes.SERVER_URL}/api/client/delete`, {
      ClientId: e.target.id
    })
    .then((res) => {
      console.log(res)
      if (user.UserId)
      fetchData(user)
    }).catch(console.log)
  };


  

  // useEffect(() => {
  //   fetchData();
  // }, [data.length === 0]);

  return (
    <div className='w-full flex flex-col items-center justify-center '>
      { data?.length === 0 && !loading ? (
        <div
          className="w-1/3  bg-blue-100 rounded border border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">No data available</p>
          <p className="text-sm">
            Click the refresh button below to check for data.
          </p>
          <button
            onClick={fetchData}
            className=" mt-3 w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="max-w-500 p-4 flex justify-center items-center">
          {loading ? <Spinner/> :
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-col">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                {data?.map((s, i) => (
                  <tr
                    key={s.ClientId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    // style={{
                    //   viewTransitionName: "mail-edit",
                    //   contain: "layout"
                    // }}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </td>
                    <td className="px-6 py-4">{s.FirstName+" "+s.LastName}</td>
                    <td className="px-6 py-4">{s.Email}</td>
                    <th className="px-6 py-4">
                      <button
                        onClick={handleSend}
                        id={s.ClientId}
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
                          id={s.ClientId}
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
                        
                        id={s.ClientId}
                        className="translate-x-full mt-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelect}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(selected.length>1)?
          <div className="flex justify-end p-2 ">
            <button onClick={handleMassSend} className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Bulk Mail
        </button>
          </div>:<></>}
          </div>}
          
        </div>
      )}
    </div>
  );
};

export default Table;
