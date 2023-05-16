import "./createJob.css"
import Sidebar from "../../components/Candidate Sidebar/CSidebar"
import ApplyJob from "../../components/ApplyJobForm/ApplyJobFeed"
function CreateJob(props) {
    return (
        <div className="CreateJob">
            <Sidebar />
            <ApplyJob />
        </div>
    )
}
export default CreateJob