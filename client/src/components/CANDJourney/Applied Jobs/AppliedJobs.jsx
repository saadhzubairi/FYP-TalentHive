import "./Candfeed.css"
import { Search } from "@mui/icons-material"
import TuneIcon from '@mui/icons-material/Tune';
import axios from "axios";
import { useState, useEffect } from "react";
import CandAppCard from "../Widgets/CandAppCard/CandAppCard";
function AppliedJobs() {
    const [myApps, setmyApps] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get(`/jobApplications?candidateId=${localStorage.getItem("userId")}`)
                .then(res => setmyApps(res.data))
                .catch(err => console.log(err));
        }
        fetchJobs();
    }, [])

    return (
        <div className="CandfeedHome">
            <div className="CandfeedWrapper1">
                <div className="CandfeedTitle1">Hello, Vladmir</div>
                <div className="Candsearchbar1">
                    <Search className="CandSearchIcon1" />
                    <input placeholder="Search across the system..." type="text" className="searchInput" />
                </div>
                <div className="Candjobss">
                    <div className="CandjobPostingHeading1">Applied Jobs</div>
                    <button className="filter"><TuneIcon /> </button>
                </div>
                <div className="line"> </div>
                <div className="CandjobPostings1">
                    {
                        myApps.map((app) => <CandAppCard app={app} />)
                    }
                </div>
                {/*  */}
            </div>
        </div>
    )
}
export default AppliedJobs