import "./AppliedJobsScreen.css"
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import AppliedJobs from "../../components/Applied Jobs/AppliedJobs"
import Rightbar from "../../components/Rightbar/Rightbar"

function AppliedJobsScreen(props) {
    return(
        <div className="mainContainer">
            
        <div class="sidebar"><Sidebar/></div>
<div class="feed1"><AppliedJobs/></div>
       
       
        
       
        
    </div>
    )
}
export default AppliedJobsScreen