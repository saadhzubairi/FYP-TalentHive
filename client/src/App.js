import "./App.css"
import CreateJob from "./screens/HRMJourney/CreateJobHR/CreateJob";
import Home from "./screens/HRMJourney/HomeHR/Home";
import EditHR from "./screens/HRMJourney/EditHR/EditHR";
import PreviewJob from "./screens/HRMJourney/CreateJobHR/PreviewJob";
import ViewJob from "./screens/HRMJourney/ViewJobHR/ViewJob";
import ViewCandidate from "./screens/HRMJourney/ViewCandidate/ViewCandidate";
import Login from "./screens/HRMJourney/Login/Login";
import Sidebar from "./components/HRMJourney/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/HRView/" element={<Home />} />
          <Route path="/HRView/login" element={<Login />} />
          <Route path="/HRView/createJob" element={<CreateJob edit={false} />} />
          <Route path="/HRView/editJob/:jobId" element={<CreateJob edit={true} />} />
          <Route path="/HRView/createJob/preview" element={<PreviewJob />} />
          <Route path="/HRView/createJob/preview/:jobId" element={<PreviewJob onApps />} />
          <Route path="/HRView/EditHr" element={<EditHR />} />
          <Route path="/HRView/ViewJob/:jobId" element={<ViewJob />} />
          <Route path="/HRView/ViewCandidate/:appId" element={<ViewCandidate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;