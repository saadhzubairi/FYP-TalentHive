import "./createJob.css"
/* import Sidebar from "../../components/Sidebar/Sidebar" */
import CJobFields from "../../../components/HRMJourney/CJobFields/CJobFields"
import CJobFieldsEdit from "../../../components/HRMJourney/CJobFieldsEdit/CJobFieldsEdit"
function CreateJob({ edit }) {
    return (
        <div className="CreateJob">

            {!edit ? <CJobFields /> : <CJobFieldsEdit />}
        </div>
    )
}
export default CreateJob