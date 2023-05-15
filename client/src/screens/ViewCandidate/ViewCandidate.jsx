import "./viewCandidate.css"
/* import Sidebar from "../../components/Sidebar/Sidebar" */
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import ViewCandidateComp from "../../components/ViewCandidateComponent/ViewCandidateComp";
function ViewCandidate(props) {
    /* const { jobId } = useParams(); */
    /* const [job, setJob] = useState({}) */
    /* useEffect(() => {
        const fetchJob = () => {
            axios.get(`/api/jobs/${jobId}`).then(res => setJob(res.data)).catch(err => console.log(err));
        }
        fetchJob();
    }, []) */
    return (
        <div className="wrapper">
            {/* <Sidebar /> */}
            <ViewCandidateComp />
        </div>
    )
}
export default ViewCandidate