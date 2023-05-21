import "./App.css"
import CreateJob from "./screens/HRMJourney/CreateJobHR/CreateJob";
import Home from "./screens/HRMJourney/HomeHR/Home";
import EditHR from "./screens/HRMJourney/EditHR/EditHR";
import PreviewJob from "./screens/HRMJourney/CreateJobHR/PreviewJob";
import ViewJob from "./screens/HRMJourney/ViewJobHR/ViewJob";
import ViewCandidate from "./screens/HRMJourney/ViewCandidate/ViewCandidate";
import Login from "./screens/HRMJourney/Login/Login";
import Sidebar from "./components/HRMJourney/Sidebar/Sidebar";
import CreateHR from "./components/HRMJourney/CreateHR/CreateHR";
//CandidateStuff
import CandHome from "./screens/CANDJourney/CandHome/CandHome"
import CandSidebar from "./components/CANDJourney/CandSidebar/CandSidebar"
import CandPreviewJob from "./screens/CANDJourney/CandApplyJob/CandPreviewJob"
import CandAppliedJobs from "./screens/CANDJourney/CandAppliedJobs/CandAppliedJobs";
import CandEdit from "./screens/CANDJourney/CandEdit/CandEdit";
import CandApplyJob from "./screens/CANDJourney/CandApplyJob/CandApplyJob"

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import CompanyMGT from "./components/HRMJourney/CompanyMGT/CompanyMGT";

const LayoutForHr = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const LayoutForCand = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <CandSidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HRView" element={<LayoutForHr />}>
          <Route path="" element={<Home />} />
          <Route path="createJob" element={<CreateJob edit={false} />} />
          <Route path="editJob/:jobId" element={<CreateJob edit={true} />} />
          <Route path="createJob/preview" element={<PreviewJob />} />
          <Route path="createJob/preview/:jobId" element={<PreviewJob onApps />} />
          <Route path="EditHr" element={<EditHR />} />
          <Route path="EditCompany" element={<CompanyMGT />} />
          <Route path="EditCompany/AddHR" element={<CreateHR />} />
          <Route path="ViewJob/:jobId" element={<ViewJob />} />
          <Route path="ViewCandidate/:appId" element={<ViewCandidate />} />
        </Route>
        <Route path="/CANDView" element={<LayoutForCand />}>
          <Route path="" element={<CandHome />} />
          <Route path="JobDesc/:jobId" element={<CandPreviewJob />} />
          <Route path="ApplyJob/:jobId" element={< CandApplyJob />} />
          <Route path="AppliedJobsScreen" element={<CandAppliedJobs />} />
          <Route path="EditCand" element={<CandEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;