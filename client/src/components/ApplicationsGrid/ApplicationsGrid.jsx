import './applicationGrid.css'
import JobAppCard from "../Widgets/JobAppsCard/JobAppCard"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
function ApplicationsGrid({ newApps }) {
    const { jobId } = useParams();
    const [jobApps, setjobApps] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            const status = newApps ? "1" : "2";
            await axios.get(`/jobApplications?jobId=${jobId}&status=${status}`)
                .then((res) => {
                    setjobApps(res.data)
                    setLoading(false)
                })
        }
        if (jobApps.length == 0) {
            fetchApplications();
        }
    }, [jobApps])

    return (
        <div className="applicationGrid">
            <div className="appGridWrapper">
                {
                    isLoading ? <CircularProgress />
                        :
                        jobApps.length === 0 ?
                            <div className="Heading">No Applications found</div> :
                            jobApps.map((jA) => <JobAppCard key={jA._id} app={jA} />)
                }
            </div>
        </div>
    )
}
export default ApplicationsGrid
