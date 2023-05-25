import { useNavigate } from 'react-router-dom';
import "./CandJobCard.css";
import { format } from "timeago.js"
import { useEffect, useState } from 'react';
import axios from 'axios';

function CandJobCard({ job }) {
  const [company, setCompany] = useState({ _id: "n/a" })
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`JobDesc/${job._id}`);
  };

  useEffect(() => {
    const getComp = async () => {
      axios.get(`/company?id=${job.companyId}`).then((res) => setCompany(res.data)).catch((err) => console.log(err))
    }
    getComp();
  }, [])

  return (
    <button className="CandjobCard" onClick={handleButtonClick}>
      <div className="CandjobCardContainer">
        <div className="imageNcol">
          <div className="image1">
            <img
              src={company.logoUrl}
              alt=""
              className="companyImage"
            />
            <div className="compName">{company.name}</div>
          </div>
          <div className="titleLocSkills">
            <div className="CandJobTitle"> {job.jobTitle} </div>
            <div className="CandLoc"> {job.location}</div>
            <div className="CandSkills">
              {job.skills.map((e) => <div className="skillChip">{e}</div>)}
            </div>
          </div>
        </div>
        <div className="Candjobtype">
          <div className="Candtype"> {job.type} </div>
          <div className="Canddate">{format(job.createdAt)}</div>
        </div>
      </div>
    </button>
  );
}

export default CandJobCard;