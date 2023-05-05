import "./viewJob.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import ViewJobComponent from "../../components/ViewJob/ViewJobComponent"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
function ViewJob(props) {
    const { jobId } = useParams();
    const [job, setJob] = useState({})
    useEffect(() => {
        const fetchJob = () => {
            axios.get(`/jobs/${jobId}`).then(res => setJob(res.data)).catch(err => console.log(err));
        }
        fetchJob();
        console.log(job)

    },[])
    return (
        <div className="ViewJob">
            <div className="wrapper">
                <Sidebar />
                {job.jobTitle !== undefined ? <ViewJobComponent key={job._id} job={job} /> : null}
            </div>
        </div>
    )
}
export default ViewJob