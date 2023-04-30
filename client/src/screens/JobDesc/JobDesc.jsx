

import "./JobDesc.css"
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import JobFeed from "../../components/JobDescriptionFeed/JobFeed"

function JobDesc(props) {
    return(
        <div className="mainContainer">
            
        <div class="sidebar"><Sidebar/></div>
<div class="feed1"><JobFeed/></div>
       
       
        
       
        
    </div>
    )
}
export default JobDesc