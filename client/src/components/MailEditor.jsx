import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { useLocation } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "../constants";
import Spinner from "./Spinner";

const MailEditor = () => {
  const {
    state: { persons: recipients, massMail: massMail },
  } = useLocation();
  // console.log(massMail);
  const [recs, setRecs] = useState(recipients);
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [from, setFrom] = useState("ncrypt.test@gmail.com");
  const [sending, setSending] = useState(false);
  const [track, setTrack] = useState(false)
  const [templates, setTemplates] = useState({
    "leave-letter": {
      title: "Leave letter",
      html: `<div>
      Good <b>Morning</b>
      <br/>I want leave
      </div>`
    },
    "seeking-project": {
      title: "Seeking project under a professor",
      html: `
      <div>
      Hey there fellas!<br/>
      Good <b>Morning</b>
      </div>`
    },
    "select-one": {
      title: "Choose a template",
      html: ''
    }
  })
  const [currTemplate, setCurrTemplate] = useState("select-one")
  const [html, setHtml] = useState("Select a template, or create a custom one");

  useEffect(() => {
    if (recipients)
    setRecs(recipients);
    console.log(recipients)
  }, [recipients]);

  const handleToggleTrack = (e) => {
    if (track)
    setHtml(html.append(`<img src="${routes.SERVER_URL}/api/analytics/track-mail">`))
    setTrack(!track)
  }

  const handleTemplateChange = (e) => {
    setCurrTemplate(e.target.value)
    setHtml(templates[e.target.value].html)
  }

  function handleMailEdit(e) {
    setHtml(e.target.value);
    console.log(html);
  }

  function handleMailSend(e) {
    setSending(true);
    const newData = {
      // from: from,
      recipients: recs,
      mass: massMail,
      mailBody: {
        plainText: html.replace(/<[^>]+>/g, ""),
        html: html,
      },
      schedule: false,
      scheduleTime: scheduleTime,
    };
    // console.log(newData);
    axios
      .post(`${routes.SERVER_URL}/api/mail/send`, {
        data: newData,
      })
      .then((res) => {

        setSending(false);
        console.log(res)
        console.log("succesfully sent");
        toast("Successfully sent email");
      })
      .catch((err) => {
        setSending(false);
        console.log(err);
        toast("Mail not sent");
      });
  }

  return (
    <div className="h-screen p-4 flex justify-center items-center flex-col min-w-500" style={{
      // viewTransitionName: "mail-edit",
      // contain: "layout"
    }}>
      <ToastContainer />
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
          value={
            recipients.map((r, i) => r.name).join(", ")
          }
          title={
            recipients.map((r, i) => r.email).join(", ")
          }
          readOnly={true}
        />
      </div>
      <div className="flex justify-around my-2 w-[80%]">
        <select defaultValue={"select-one"} value={currTemplate} onChange={handleTemplateChange}>
          {Object.entries(templates).map((t) => (
            <option value={t[0]}>{t[1].title}</option>
          ))}
        </select>
        <button onClick={handleToggleTrack}>
          Tracking: {track?"ON":"OFF"}
        </button>
      </div>
      <div className="my-3 w-1/2 h-1/3">
        <DefaultEditor value={html} onChange={handleMailEdit} className="" />
      </div>
      {sending ? (
        <div className="w-full flex items-center justify-center">
          <Spinner/>
      </div>) :<div className="btns flex justify-between w-1/2">
        <div className="flex justify-around w-2/3">
          <DateTimePicker value={scheduleTime} onChange={setScheduleTime} />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Schedule Send
          </button>
        </div>
        <button
          type="submit"
          onClick={handleMailSend}
          className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send
        </button>
      </div>}
    </div>
  );
};

export default MailEditor;
