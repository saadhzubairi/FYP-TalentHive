import "./home.css"
import Sidebar from '../../components/Candidate Sidebar/CSidebar'
import Feed from "../../components/HomeFeed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"

function Home(props) {
    return(
        <div className="mainContainer">
            
            <div class="sidebar"><Sidebar/></div>
  <div class="feed1"><Feed/></div>
           
           
            
           
            
        </div>
    )
}
export default Home