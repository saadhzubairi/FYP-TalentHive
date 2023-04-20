import "./jobCard.css"
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
function JobCard(props) {
    return(
        <div className="jobCard">
            <div className="jobCardContainer">
                <div className="positionSpots">
                    <div className="position">Java Developer</div>
                    <div className="spots">2 spots to fill</div>
                </div>
                <div className="applicationsCount">
                    <div className="count">17</div>
                    <button className="up"><KeyboardDoubleArrowUpRoundedIcon className="upIcon"/></button>
                </div>
            </div>
        </div>
    )
}
export default JobCard