import "./createJob.css"
import Sidebar from "../../components/Sidebar/Sidebar"
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