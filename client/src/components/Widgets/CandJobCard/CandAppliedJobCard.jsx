import { useNavigate } from 'react-router-dom';
import "./CandJobCard.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";


function CandAppliedJobCard({job}) {


  const createdAt = new Date(job.createdAt);
const formattedDate = createdAt.toLocaleDateString(); // Format the date as per your locale

console.log(formattedDate);

const skills = job.skills; // Assuming 'skills' is an array of strings

const separatedSkills = skills.join(', ');


  return (
    <div className="CandjobCard1">
      <div className="CandjobCardContainer1">
        <div className="Candjobtype">
          <div className="Candtype"> {job.type} </div>
          <div className="Canddate">{formattedDate}</div>
        </div>
        <div className="CandpositionSpots">
          <div className="Candposition">
            <div className="Candtitle1"> {job.jobTitle} </div>
          </div>
          <div className="Candloc"> {job.location}</div>
          <div className="Candspots">Skills: {separatedSkills}</div>
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
    </div>
  );
}

export default CandAppliedJobCard;