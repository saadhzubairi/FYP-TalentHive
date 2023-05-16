import EditCandFields from '../../components/EditCandFields/EditCandFields'
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import './editCand.css'
function EditHR(props) {
    return(
        <div className="editCandWrapper">
            <Sidebar/>
            <EditCandFields/>
        </div>
    )
}
export default EditHR