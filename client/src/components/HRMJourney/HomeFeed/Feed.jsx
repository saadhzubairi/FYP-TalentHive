import "./feed.css"
import { Error, Search } from "@mui/icons-material"
import JobCard from "../../Widgets/JobCards/JobCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { CircularProgress, LinearProgress } from "@mui/material"
function Feed() {
    const userId = localStorage.getItem("userId")
    const companyId = localStorage.getItem("companyId")
    const [myjobs, setJobs] = useState([])
    const [compjobs, setCompJobs] = useState([])
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        const fetchMyJobs = async () => {
            setIsloading(true)
            await axios.get(`/jobs?HRCreatorId=${userId}`).then(res => { setJobs(res.data); setIsloading(false) }).catch(err => { console.log(err); setIsloading(false) });
        }
        const fetchCompJobs = async () => {
            setIsloading(true)
            await axios.get(`/jobs?companyId=${companyId}&HRCreatorId[$ne]=${userId}`).then(res => { setCompJobs(res.data); setIsloading(false) }).catch(err => { console.log(err); setIsloading(false) });
        }
        fetchMyJobs();
        fetchCompJobs();
    }, [])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <div className="topSection">
                    <div className="feedTitle">Hello, Vladmir</div>
                    <div className="searchbar">
                        <Search className="SearchIcon" />
                        <input placeholder="Search across the system..." type="text" className="searchInput" />
                    </div>
                </div>
                <div className="jobPostingsSectionContainer">
                    <div className="jobPostingsSection">
                        <div className="jobPostingHeading">Created Jobs</div>
                        <div className="jobPostingsContainer">
                            {isLoading ? <div className="jobPostings"> <LinearProgress /> </div> :
                                myjobs.length === 0 ? <div className="jobPostingsError"><div className="error"><Error />No jobs found...</div></div> :
                                    < div className="jobPostings">
                                        {
                                            myjobs.map((j) => (<JobCard key={j._id} job={j} />))
                                        }
                                    </div>
                            }
                        </div>
                        <div className="jobPostingHeading">Company Jobs</div>
                        <div className="jobPostingsContainer">
                            {isLoading ? <div className="jobPostings"> <LinearProgress /> </div> :
                                compjobs.length === 0 ? <div className="jobPostingsError"><div className="error"><Error />No jobs found...</div></div> :
                                    < div className="jobPostings">
                                        {
                                            compjobs.map((j) => (<JobCard key={j._id} job={j} />))
                                        }
                                    </div>
                            }
                        </div>
                    </div></div>
            </div>
        </div >
    )
}
export default Feed


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