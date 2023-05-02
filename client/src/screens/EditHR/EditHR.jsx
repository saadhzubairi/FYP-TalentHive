import EditHRFields from '../../components/EditHRFields/EditHRFields'
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import './editHr.css'
function EditHR(props) {
    return(
        <div className="editHrWrapper">
            <Sidebar/>
            <EditHRFields/>
        </div>
    )
}
export default EditHR