import "./viewJob.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import ViewJobComponent from "../../components/ViewJob/ViewJobComponent"
function ViewJob(props) {
    return(
        <div className="ViewJob">
            <div className="wrapper">
                <Sidebar/>
                <ViewJobComponent/>
            </div>
        </div>
    )
}
export default ViewJob