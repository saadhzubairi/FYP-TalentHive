import "./feed.css"
import { Search } from "@mui/icons-material"
import JobCard from "../Widgets/JobCards/JobCard"
import TuneIcon from '@mui/icons-material/Tune';
function AppliedJobs() {
    return (
        <div className="feed1">
            <div className="feedWrapper1">
                <div className="feedTitle1">Hello, Vladmir</div>
                <div className="searchbar1">
                    <Search className="SearchIcon1" />
                    <input placeholder="Search across the system..." type="text" className="searchInput" />
                </div>

                <div className="jobss">

                <div className="jobPostingHeading1">Applied Jobs</div>
                <button className="filter"><TuneIcon/> </button>
               
                </div>

                <div className="line"> </div>
                <div className="jobPostings1">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                </div>
            </div>
        </div>
    )
}
export default AppliedJobs


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