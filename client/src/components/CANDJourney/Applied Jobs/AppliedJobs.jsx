import "./Candfeed.css"
import { Search } from "@mui/icons-material"
import CandJobCard from "../Widgets/CandJobCard/CandJobCard"
import TuneIcon from '@mui/icons-material/Tune';
import axios from "axios";
import { useState,useEffect } from "react";
function AppliedJobs() {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get("/jobs").then(res => setJobs(res.data)).catch(err => console.log(err));
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
                <button className="filter"><TuneIcon/> </button>
               
                </div>

                <div className="line"> </div>
                <div className="CandjobPostings1">
                {
                        jobs.map((j) => (<CandJobCard key={j._id} job={j} />))
                    }
                </div>
            </div>
        </div>
    )
}
export default AppliedJobs