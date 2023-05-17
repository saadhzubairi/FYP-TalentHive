import CreateJob from "./screens/CreateJobCand/CreateJob";
import CandHome from "./screens/HomeCand/CandHome";
import AppliedJobsScreen from "./screens/Applied Jobs/AppliedJobsScreen";


import { BrowserRouter , Switch, Route, Routes } from "react-router-dom";
import EditCand from "./screens/EditCand/EditCand"
import PreviewJob from "./screens/CreateJobCand/CandPreviewJob"
import Jobapp from "./screens/JobApplication/jobapp";
function App() {
  return (
    <BrowserRouter>
    
    <main>
    <Routes>
<Route path="/" element={<CandHome/>} />
<Route path="/JobDesc/:jobId" element={<PreviewJob/>} />
<Route path="/AppliedJobsScreen" element={<AppliedJobsScreen/>} />
<Route path="/ApplyJob/:jobId" element={<CreateJob/>} />
<Route path="/EditCand" element={<EditCand/>} />
<Route path="/PreviewJobApplication/:jobApplicationId" element={<Jobapp/>} />


    </Routes>



    </main>
    
    </BrowserRouter>


  );
}

export default App;

