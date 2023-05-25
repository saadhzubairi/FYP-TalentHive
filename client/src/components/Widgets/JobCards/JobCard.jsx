import { Link } from "react-router-dom";
import "./jobCard.css"
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
function JobCard({job}) {
    return (
        <div className="jobCard">
            <Link to={`ViewJob/${job._id}`} style={{textDecoration: "none",}}>
                <div className="jobCardContainer">
                    <div className="positionSpots">
                        <div className="position">{job.jobTitle}</div>
                        <div className="spots">{job.spots} spots to fill</div>
                    </div>
                    <div className="applicationsCount">
                        <div className="count">{job.applications.length}</div>
                        <button className="up"><KeyboardDoubleArrowUpRoundedIcon className="upIcon" /></button>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default JobCard