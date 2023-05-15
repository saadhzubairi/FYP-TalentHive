import "./App.css"
import CreateJob from "./screens/CreateJobHR/CreateJob";
import Home from "./screens/HomeHR/Home";
import EditHR from "./screens/EditHR/EditHR";
import PreviewJob from "./screens/CreateJobHR/PreviewJob";
import ViewJob from "./screens/ViewJobHR/ViewJob";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ViewCandidate from "./screens/ViewCandidate/ViewCandidate";
import Login from "./screens/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Sidebar />
      <div className="mainAppContent">
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createJob" element={<CreateJob edit={false} />} />
          <Route path="/editJob/:jobId" element={<CreateJob edit={true} />} />
          <Route path="/createJob/preview" element={<PreviewJob />} />
          <Route path="/createJob/preview/:jobId" element={<PreviewJob onApps />} />
          <Route path="/EditHr" element={<EditHR />} />
          <Route path="/ViewJob/:jobId" element={<ViewJob />} />
          <Route path="/ViewCandidate/:appId" element={<ViewCandidate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;