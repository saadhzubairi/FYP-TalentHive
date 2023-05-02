import CreateJob from "./screens/CreateJobHR/CreateJob";
import Home from "./screens/HomeHR/Home";
import AppliedJobsScreen from "./screens/Applied Jobs/AppliedJobsScreen";

import { BrowserRouter , Switch, Route, Routes } from "react-router-dom";
import EditHR from "./screens/EditHR/EditHR"
import PreviewJob from "./screens/CreateJobHR/PreviewJob"
function App() {
  return (
    <BrowserRouter>
    <main>
    <Routes>
<Route path="/" element={<Home/>} />
<Route path="/JobDesc" element={<PreviewJob/>} />
<Route path="/AppliedJobsScreen" element={<AppliedJobsScreen/>} />
<Route path="/ApplyJob" element={<CreateJob/>} />
<Route path="/EditHR" element={<EditHR/>} />

    </Routes>



    </main>
    
    </BrowserRouter>


  );
}

export default App;

