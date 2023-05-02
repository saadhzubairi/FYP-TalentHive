import "./createJob.css"
import Sidebar from "../../components/Candidate Sidebar/CSidebar"
import CJobFields from "../../components/CJobFields/CJobFields"
function CreateJob(props) {
    return (
        <div className="CreateJob">
            <Sidebar />
            <CJobFields />
        </div>
    )
}
export default CreateJob