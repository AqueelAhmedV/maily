import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { useLocation } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import  'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const MailEditor = () => {
  const {
    state: { persons: recipients, massMail: massMail},
  } = useLocation();
  console.log(massMail);
  const [html, setHtml] = useState("my <b>HTML</b>");
  const [recs, setRecs] = useState(recipients);
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [from, setFrom] = useState('aqueel.ahmedv.iitkgp@gmail.com')
  useEffect(() => {
    setRecs(recipients)
  }, [recipients!==undefined])

  
  function handleMailEdit(e) {
    setHtml(e.target.value);
    console.log(html)
  }

  function handleSend(e) {
    const newData = {
      from: from,
            recipients: recs,
            mass: massMail,
            mailBody: {
                plainText: html.replace(/<[^>]+>/g, ''),
                html: html
            },
            schedule: false,
            scheduleTime: scheduleTime
    }
    console.log(newData)
    // axios.post(`${import.meta.env.VITE_SERVER_URL}/api/mail/send}`, {
    //     data: newData
    // })
  }
  
  
  return (
    <div className="h-screen p-4 flex justify-center items-center flex-col min-w-500">
      <div className="w-1/2 flex justify-between h-fit">
      <label className="w-1/5 py-2 text-gray-500">From:</label>
      <input
            type="email"
            className="w-4/5 pl-2 mx-1 my-2 w-3/6 relative m-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            />
      </div>
      <div className="w-1/2 flex justify-between">
        
            <label className="w-1/5 py-2 text-gray-500">Recipients:</label>
        <input
            type="text"
            className="pl-2 w-4/5 relative m-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            placeholder="Recipient name(s)"
            aria-label="Recipient name(s)"
            aria-describedby="basic-addon2"
            value={(massMail)?[recipients.map((r,i) => r.name)].join(', '):recipients.name}
            title={(massMail)?[recipients.map((r,i) => r.email)].join(', '):recipients.email}
            readOnly={true}
          />
        </div>
      <div className="my-3 w-1/2 h-1/3">
        <DefaultEditor value={html} onChange={handleMailEdit} className="" />
      </div>
      <div className="btns flex justify-between w-1/2">
        <div className="flex justify-around w-2/3">
            <DateTimePicker value={scheduleTime} onChange={setScheduleTime}/>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Schedule Send
        </button>
        </div>
        <button type="submit" onClick={handleSend} className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Send
        </button>
      </div>
    </div>
  );
};

export default MailEditor;
