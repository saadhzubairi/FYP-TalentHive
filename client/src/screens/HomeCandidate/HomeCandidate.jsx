import "./homeCandidate.css"
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import CandidateFeed from "../../components/CandidateHomeFeed/CandidateFeed"
import Rightbar from "../../components/Rightbar/Rightbar"

function Home(props) {
    return(
        <div className="homeContainer">
            
            
           <Sidebar/>
           <CandidateFeed/>
           
           
            
           
            
        </div>
    )
}
export default Home