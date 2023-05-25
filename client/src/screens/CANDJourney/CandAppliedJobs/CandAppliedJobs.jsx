import "./candAppliedJobs.css"
import AppliedJobs from "../../../components/CANDJourney/Applied Jobs/AppliedJobs"
import CandRightBar from "../../../components/CANDJourney/CandRightBar/CandRightBar"

function CandAppliedJobs(props) {
    return (
        <div className="mainContainer">
            <div class="feed1"><AppliedJobs /></div>
            <CandRightBar />
        </div>
    )
}
export default CandAppliedJobs