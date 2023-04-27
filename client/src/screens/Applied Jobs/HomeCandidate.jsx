import "./homeCandidate.css"
import Sidebar from '../../components/Candidate Sidebar/Sidebar'
import AppliedJobs from "../../components/Applied Jobs/AppliedJobs"
import Rightbar from "../../components/Rightbar/Rightbar"

function Home(props) {
    return(
        <div className="homeContainer">
            
            
           <Sidebar/>
           <AppliedJobs/>
           
           
            
           
            
        </div>
    )
}
export default Home