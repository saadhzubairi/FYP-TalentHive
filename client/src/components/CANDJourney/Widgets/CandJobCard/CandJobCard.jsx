import { useNavigate } from 'react-router-dom';
import "./CandJobCard.css";
import { format } from "timeago.js"

function CandJobCard({ job }) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`JobDesc/${job._id}`);
  };

  return (
    <button className="CandjobCard" onClick={handleButtonClick}>
      <div className="CandjobCardContainer">

        <div className="imageNcol">

          <div className="image1">
            <img
              src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg"
              alt=""
              className="companyImage"
            />
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