import { useNavigate } from 'react-router-dom';
import "./jobCard.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";


function JobCard({job}) {
  const history = useNavigate(); // Get access to the history object

  const handleButtonClick = () => {
    history(`/JobDesc/${job._id}`); 
    // Navigate to the "jobdesc" route
  };

  return (
    <button className="jobCard1" onClick={handleButtonClick}>
      <div className="jobCardContainer1">
        <div className="jobtype">
          <div className="type"> {job.type} </div>
          <div className="date">23/07/2022</div>
        </div>
        <div className="positionSpots">
          <div className="position">
            <div className="title1"> {job.jobTitle} </div>
          </div>
          <div className="title2"> {job.location}</div>
          <div className="spots">{job.skills}</div>
          <div className="spots">Experience Required: 2 Years</div>
        </div>
        <div className="image1">
          <img
            src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg"
            alt=""
            className="companyImage"
          />
        </div>
      </div>
    </button>
  );
}

export default JobCard;