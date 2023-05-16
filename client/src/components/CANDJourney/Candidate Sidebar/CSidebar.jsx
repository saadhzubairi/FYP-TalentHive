import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import WorkIcon from '@mui/icons-material/Work';
import Person4Icon from '@mui/icons-material/Person4';
import "./Csidebar.css"
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                <ul className="optionsList">
                    <li className="option">
                     <HomeOutlined className="optionsIcon" />
                    <Link to="/" className="optionLink">Home</Link>
                         </li>  
               
                    <li className="option">
                        <WorkIcon className="optionsIcon" />
                        <Link to="/AppliedJobsScreen" className="optionLink">Applied Jobs</Link>
                    </li>
                    <li className="option"><Person4Icon className="optionsIcon" />
                    <Link to="/EditCand" className="optionLink">Profile</Link> </li>
                    
                </ul>
            </div>
        </div>
    )
}
export default Sidebar