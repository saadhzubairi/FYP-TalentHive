import "./jobapp.css"
import CSidebar from '../../components/Candidate Sidebar/CSidebar'
import Jobapplication from "../../components/Jobapplication/Jobapplication"

function Jobapp(props) {
    return(
        <div className="mainContainer">
              <CSidebar/>
              <Jobapplication/>

        </div>

    )

}
export default Jobapp