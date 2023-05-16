import "./Candhome.css"
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import Feed from "../../components/CandHomeFeed/CandFeed"

function CandHome(props) {
    return(
        <div className="mainContainer">
            
            <div class="sidebar"><Sidebar/></div>
  <div class="feed1"><Feed/></div>
           
           
            
           
            
        </div>
    )
}
export default CandHome