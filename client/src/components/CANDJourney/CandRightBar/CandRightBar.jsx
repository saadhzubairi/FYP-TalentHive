import { NotificationAdd } from '@mui/icons-material'
import "./candRightBar.css"
function CandRightBar(props) {
    return (
        <div className="rightbar">
            <div className="topContainer">
                <div className="topHeading"><NotificationAdd /> Notifications</div>
            </div>
        </div>
    )
}
export default CandRightBar