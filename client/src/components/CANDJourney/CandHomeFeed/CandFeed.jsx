import "./Candfeed.css"
import { Search } from "@mui/icons-material"
import CandJobCard from "../Widgets/CandJobCard/CandJobCard"
import TuneIcon from '@mui/icons-material/Tune';
import axios from "axios";
import { useState,useEffect } from "react";
function CandFeed() {

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

                <div className="CandjobPostingHeading1">Available Jobs</div>
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
export default CandFeed


/* you can implement the "show more" functionality using React state and event handlers.

Create a state variable to keep track of whether the additional items are visible:
const [showMore, setShowMore] = useState(false);

Define a function to toggle the "showMore" state when the "Show more" button is clicked:
function handleShowMore() {
setShowMore(!showMore);
}

Render the grid items based on the "showMore" state:
<div className="jobPostings">
  {jobCards.slice(0, 6)}
  {showMore && jobCards.slice(6)}
</div>
Here, the first six items are always shown, but the rest are only rendered if the "showMore" state is true.

Render the "Show more" button:
{jobCards.length > 6 && (
<button onClick={handleShowMore}>
{showMore ? "Show less" : "Show more"}
</button>
)}

This code checks if there are more than 6 job cards and, if so, renders the "Show more" button with the appropriate text ("Show more" or "Show less", depending on the "showMore" state). When the button is clicked, the "handleShowMore" function is called, toggling the "showMore" state and causing the grid to re-render with the additional items either shown or hidden.

Putting it all together, your React component might look something like this:

import { useState } from "react";

function JobPostings({ jobCards }) {
const [showMore, setShowMore] = useState(false);

function handleShowMore() {
setShowMore(!showMore);
}

return (
<div className="jobPostings">
{jobCards.slice(0, 6)}
{showMore && jobCards.slice(6)}
{jobCards.length > 6 && (
<button onClick={handleShowMore}>
{showMore ? "Show less" : "Show more"}
</button>
)}
</div>
);
} */