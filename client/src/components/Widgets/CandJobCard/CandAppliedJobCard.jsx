import { useNavigate } from 'react-router-dom';
import "./CandJobCard.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";


function CandAppliedJobCard({job}) {
  const history = useNavigate(); // Get access to the history object

  const handleButtonClick = () => {
    history(`/JobDesc/${job._id}`); 
    // Navigate to the "jobdesc" route
  };




  return (
    <button className="CandjobCard1" onClick={handleButtonClick}>
      <div className="CandjobCardContainer1">
        <div className="Candjobtype">
          <div className="Candtype"> {job.type} </div>
          <div className="Canddate">23/07/2022</div>
        </div>
        <div className="CandpositionSpots">
          <div className="Candposition">
            <div className="Candtitle1"> {job.jobTitle} </div>
          </div>
          <div className="Candloc"> {job.location}</div>
          <div className="Candspots">{job.skills}</div>
          <div className="Candspots">Experience Required: 2 Years</div>
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

export default CandAppliedJobCard;