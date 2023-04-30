

import "./ApplyJob.css"


import ApplyFeed from "../../components/Apply Job/ApplyFeed"
import Sidebar from "../../components/Candidate Sidebar/CSidebar"
import Rightbar from "../../components/Rightbar/Rightbar"
function ApplyJob(props) {
    return(
        <div className="mainContainer">
            
        <div class="sidebar"><Sidebar/></div>
<div class="feed1"><ApplyFeed/></div>
       
       
        
       
        
    </div>
    )
}
export default ApplyJob