import CreateJob from "./screens/CreateJobHR/CreateJob";
import Home from "./screens/HomeHR/Home";
import JobDesc from "./screens/JobDesc/JobDesc"
import HomeCandidae from "./screens/HomeCandidate/HomeCandidate"
import JobCard from "./components/Widgets/JobCards/JobCard";
import AppliedJobsScreen from "./screens/Applied Jobs/AppliedJobsScreen";
import JobFeed from "./components/JobDescriptionFeed/JobFeed";
import ApplyFeed from "./components/Apply Job/ApplyFeed";
import ApplyJobCard from "./components/Widgets/Apply Job/ApplyJobCard";
import UpperBar from "./components/Widgets/Upperbar/Upperbar"
import ApplyJob from "./screens/Apply Job/ApplyJob";
import ApplyNowCard from "./components/Widgets/JobCards/ApplyNowCard"

import { BrowserRouter , Switch, Route, Routes } from "react-router-dom";
import JobDescCard from "./components/JobDescCard/JobDescCard";


function App() {
  return (
    <BrowserRouter>
    <main>
    <Routes>
<Route path="/" element={<Home/>} />
<Route path="/JobDesc" element={<JobDesc/>} />
<Route path="/AppliedJobsScreen" element={<AppliedJobsScreen/>} />
<Route path="/ApplyJob" element={<ApplyJob/>} />
 


    </Routes>



    </main>
    
    </BrowserRouter>


  );
}

export default App;

