import "./home.css"
import Sidebar from '../../components/Candidate Sidebar/Sidebar'
import Feed from "../../components/HomeFeed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"

function Home(props) {
    return(
        <div className="homeContainer">
            
            
           <Sidebar/>
           <Feed/>
           
           
            
           
            
        </div>
    )
}
export default Home