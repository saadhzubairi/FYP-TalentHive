import "./Candfeed.css";
import { Search } from "@mui/icons-material";
import CandJobCard from "../Widgets/CandJobCard/CandJobCard";
import TuneIcon from '@mui/icons-material/Tune';
import axios from "axios";
import { useState, useEffect } from "react";
import CandAppliedJobCard from "../Widgets/CandJobCard/CandAppliedJobCard";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobApplications/candidate/6461551de36ab2b8ead5623a');
        const appliedJobs = response.data.map(async (jobApplication) => {
          try {
            const jobResponse = await axios.get(`/jobs/${jobApplication.jobId}`);
            return jobResponse.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        });
  
        const jobDetails = await Promise.all(appliedJobs);
        setJobs(jobDetails.filter(job => job !== null));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchJobs();
  }, []);
  

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
          <button className="filter"><TuneIcon/></button>
        </div>

        <div className="line"></div>
        <div className="CandjobPostings1">
        {jobs.map((job) => (
            job && <CandAppliedJobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;
