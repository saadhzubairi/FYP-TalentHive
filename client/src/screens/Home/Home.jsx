import "./home.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"
function Home(props) {
    return(
        <div className="homeContainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
        </div>
    )
}
export default Home