import { useNavigate } from 'react-router-dom';
import "./jobCard.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";

function JobCard(props) {
  const history = useNavigate(); // Get access to the history object

  const handleButtonClick = () => {
    history("/JobDesc"); 
    // Navigate to the "jobdesc" route
  };

  return (
    <button className="jobCard1" onClick={handleButtonClick}>
      <div className="jobCardContainer1">
        <div className="jobtype">
          <div className="type"> Full Time </div>
          <div className="date">23/07/2022</div>
        </div>
        <div className="positionSpots">
          <div className="position">
            <div className="title1"> Java Developer </div>
          </div>
          <div className="title2"> Karachi,Sindh,Pakistan</div>
          <div className="spots">Skills Required Java, React JS, Node JS</div>
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
