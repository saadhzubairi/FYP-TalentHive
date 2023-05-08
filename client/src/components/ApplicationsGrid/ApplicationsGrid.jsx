import './applicationGrid.css'
import JobAppCard from "../Widgets/JobAppsCard/JobAppCard"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
function ApplicationsGrid({ newApps }) {
    const { jobId } = useParams();
    const [jobApps, setjobApps] = useState([])
    useEffect(() => {
        const fetchApplications = async () => {
            const status = newApps ? "1" : "2";
            await axios.get(`/api/jobApplications?jobId=${jobId}&status=${status}`)
                .then(res => setjobApps(res.data))
        }
        if (jobApps.length==0) {
            fetchApplications();
        }
    }, [jobApps])
    return (
        <div className="applicationGrid">
            <div className="appGridWrapper">
                {jobApps.map((jA) => <JobAppCard key={jA._id} app={jA} />)}
            </div>
        </div>
    )
}
export default ApplicationsGrid
