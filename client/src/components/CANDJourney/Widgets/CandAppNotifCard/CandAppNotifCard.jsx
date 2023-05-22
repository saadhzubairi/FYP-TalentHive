import { useNavigate } from 'react-router-dom';
import "./candAppNotifCard.css";
import { format } from "timeago.js"
import { useEffect, useState } from 'react';
import axios from 'axios';

function CandAppNotifCard({ app }) {
  const [company, setCompany] = useState({ _id: "n/a" })
  const [job, setjob] = useState({ _id: "n/a" })
  const navigate = useNavigate();

  useEffect(() => {
    const getJob = async () => {
      axios.get(`/jobs/${app.jobId}`).then(async (res) => {
        setjob(res.data)
        await axios.get(`/company?id=${res.data.companyId}`)
          .then((resc) => setCompany(resc.data))
          .catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }
    getJob();
  }, [])

  return (
    <>
      {
        app.status === 2 ? <div className="CandNotifCard">
          {
            company._id === "i/d" ? <div className="loading">Loading...</div> : <>
              <div className="shortlisted">Shortlisted!</div>
              <div className="jobname">{job.jobTitle}</div>
              <div className="companyname">{company.name}</div>
              <div className="interviewTime">Interview {format(app.interview)}</div>
            </>
          }
        </div >
          :
          null
      }
    </>
  );
}

export default CandAppNotifCard;