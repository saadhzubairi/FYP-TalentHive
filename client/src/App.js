import CreateJob from "./screens/CreateJobHR/CreateJob";
import Home from "./screens/HomeHR/Home";
import EditHR from "./screens/EditHR/EditHR";
import PreviewJob from "./screens/CreateJobHR/PreviewJob";
import ViewJob from "./screens/ViewJobHR/ViewJob";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createJob" element={<CreateJob edit={false} />} />
          <Route path="/editJob/:jobId" element={<CreateJob edit={true}/>} />
          <Route path="/createJob/preview" element={<PreviewJob />} />
          <Route path="/createJob/preview/:jobId" element={<PreviewJob onApps/>} />
          <Route path="/EditHr" element={<EditHR />} />
          <Route path="/ViewJob/:jobId" element={<ViewJob />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;