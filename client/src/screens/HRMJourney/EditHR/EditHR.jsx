import EditHRFields from '../../../components/HRMJourney/EditHRFields/EditHRFields'
/* import Sidebar from '../../components/Sidebar/Sidebar' */
import './editHr.css'
function EditHR(props) {
    return(
        <div className="editHrWrapper">
            {/* <Sidebar/> */}
            <EditHRFields/>
        </div>
    )
}
export default EditHR