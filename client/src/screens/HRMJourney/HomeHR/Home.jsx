import "./home.css"
/* import Sidebar from '../../components/Sidebar/Sidebar' */
import Feed from "../../../components/HRMJourney/HomeFeed/Feed"
import Rightbar from "../../../components/HRMJourney/Rightbar/Rightbar"
function Home(props) {
    return (
        <div className="homeContainer">
            {/* <Sidebar/> */}
            <Feed />
            <Rightbar />
        </div>
    )
}
export default Home