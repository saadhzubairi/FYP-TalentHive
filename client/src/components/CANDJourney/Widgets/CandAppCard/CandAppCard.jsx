import "./candAppCard.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from "timeago.js"
import { CircularProgress, LinearProgress } from "@mui/material";

function CandAppCard({ app }) {
  const [job, setJob] = useState({ _id: "n/a" });
  const [company, setCompany] = useState({ _id: "n/a" });
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    const getJobAndComp = async () => {
      await axios.get(`/jobs/${app.jobId}`).then(
        async (res1) => {
          setJob(res1.data)
          await axios.get(`/company?id=${res1.data.companyId}`)
            .then(
              (res2) => {
                setCompany(res2.data)
              })
            .catch((err) => { console.log(err); })
        }).catch((err) => { console.log(err); })
    }
    getJobAndComp();
  }, [])

  const toggleModal = () => { setModal(!modal) }

  return (
    <>
      <div className="CandAppCard" onClick={toggleModal} >
        <div className="CandAppCardPane">
          <div className="CandAppCardLeft">
            {job._id === "n/a" ? <LinearProgress /> : <div className="CandAppCardJob">{job.jobTitle}</div>}
            {company._id === "n/a" ? <LinearProgress /> : <div className="CandAppCardCompany">{company.name}</div>}
          </div>
          <div className="CandAppCardRight">
            <div className="jobAppStatus">{app.status === 1 ? "Review" : app.status === 2 ? "Shortlisted" : "Not Selected"}</div>
            <div className="jobAppCreated">Applied {format(app.createdAt)}</div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}>
            <div className="modal-content">
              <h1>My Application</h1>
              <div className="modalViewPort">
                <div className="modalContainer">
                  <div className="CandAppCardModal">
                    <div className="jobAppCreated">Applied {format(app.createdAt)}</div>
                    <h1>{job.jobTitle}</h1>
                    <div className="CandAppCardCompany">{company.name}</div>
                    <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                  </div>
                  <div className="CandAppCardModal">
                    <b>What made you apply for this job?</b>
                    <div className="">{app.message1}</div>
                  </div>
                  <div className="CandAppCardModal">
                    <b>Why do you think you'll be a perfect fit?</b>
                    <div className="">{app.message2}</div>
                  </div>
                </div>
              </div>
              <button className="close" onClick={toggleModal}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CandAppCard;