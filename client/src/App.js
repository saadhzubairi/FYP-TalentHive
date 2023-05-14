import CreateJob from "./screens/CreateJobCand/CreateJob";
import CandHome from "./screens/HomeCand/CandHome";
import AppliedJobsScreen from "./screens/Applied Jobs/AppliedJobsScreen";

import { BrowserRouter , Switch, Route, Routes } from "react-router-dom";
import EditCand from "./screens/EditCand/EditCand"
import PreviewJob from "./screens/CreateJobCand/CandPreviewJob"
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

    </Routes>



    </main>
    
    </BrowserRouter>


  );
}

export default App;

