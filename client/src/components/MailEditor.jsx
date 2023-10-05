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
import { routes, tracking } from "../constants";
import Spinner from "./Spinner";
import { Button } from "./common/Button";

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
    "default": {
      title: "Choose Template",
      html: ``
    },
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
    }
  })
  const [currTemplate, setCurrTemplate] = useState("default")
  const [html, setHtml] = useState("");

  useEffect(() => {
    console.log(html)
  }, [html])

  useEffect(() => {
    if (recipients)
    setRecs(recipients);
    console.log(recipients)
  }, [recipients]);

  useEffect(() => {
    console.log(recs)
  }, [recs])

  const handleToggleTrack = (e) => {
    setTrack(!track)
  }

  const handleTemplateChange = (e) => {
    setCurrTemplate(e.target.value)
    setHtml(templates[e.target.value].html)
  }

  function handleMailEdit(e) {
    setHtml(e.target.value);
  }

  function handleMailSend(e) {
    setSending(true);
    console.log(html)
    const newData = {
      // from: from,
      recipients: recs,
      mass: massMail,
      mailBody: {
        // plainText: html.replace(/<[^>]+>/g, ""),
        html: html + (tracking ? tracking.mail: ""),
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
        toast.success("Successfully sent email");
      })
      .catch((err) => {
        setSending(false);
        console.log(err);
        toast.error("Mail not sent");
      });
  }

  return (
    <div className="flex h-4/5 justify-center items-center flex-col min-w-500 bg-[#333]" style={{
      // viewTransitionName: "mail-edit",
      // contain: "layout"
    }}>
      <ToastContainer />
      <div className="bg-white px-3 py-4 rounded-md aspect-square mt-3">
      <div className="w-4/5 flex justify-between">
        <label className="">From:</label>
        <input
          type="email"
          className=""
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="w-4/5 flex justify-between">
        <label className="">Recipients:</label>
        <input
          type="text"
          className=""
          placeholder="Recipient name(s)"
          aria-label="Recipient name(s)"
          aria-describedby="basic-addon2"
          value={
            recipients.map((r, i) => r.fullName).join(", ")
          }
          title={
            recipients.map((r, i) => r.emailId).join(", ")
          }
          readOnly={true}
        />
      </div>
      <div className="w-full flex justify-around">
        <select placeholder="Select Template" onChange={handleTemplateChange}>
          {Object.entries(templates).map((t,i) => (
            <option key={i} value={t[0]}>{t[1].title}</option>
          ))}
        </select>
        <Button style={track ? {
            color: "var(--toastify-color-success"
          }: {}} onClick={handleToggleTrack} text={`Tracking: ${track?"ON":"OFF"}`}/>
      </div>
      <div className="">
        <DefaultEditor value={html} onChange={handleMailEdit} className="" />
      </div>
      <div className="">
        <div className="">
          <DateTimePicker value={scheduleTime} onChange={setScheduleTime} />
          <button
            type="submit"
            className=""
          >
            Schedule Send
          </button>
        </div>
        <Button
          type="submit"
          onClick={handleMailSend}
          text={"Send Mail"}
          loading={sending}
          loadingText={"Sending..."}
          // disabled={!sending}
        />
      </div>
      </div>
    </div>
  );
};

export default MailEditor;
