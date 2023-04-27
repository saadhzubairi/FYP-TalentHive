

import "./JobDesc.css"
import Sidebar from '../../components/Candidate Sidebar/Sidebar'
import JobFeed from "../../components/JobDescriptionFeed/JobFeed"

function Home(props) {
    return(
        <div className="homeContainer">
            <Sidebar/>
            <JobFeed/>
          
            
            
        </div>
    )
}
export default Home