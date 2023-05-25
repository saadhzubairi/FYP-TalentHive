import "./Candhome.css"
import CandFeed from "../../../components/CANDJourney/CandHomeFeed/CandFeed"
import CandRightBar from "../../../components/CANDJourney/CandRightBar/CandRightBar"

function CandHome(props) {
    return (
        <div className="mainContainer">
            <div class="feed1"><CandFeed /></div>
            <CandRightBar />
        </div>
    )
}
export default CandHome