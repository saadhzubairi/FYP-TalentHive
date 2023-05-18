import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, Logout, PostAddOutlined } from "@mui/icons-material"
import WorkIcon from '@mui/icons-material/Work';
import Person4Icon from '@mui/icons-material/Person4';
import "./candSidebar.css"
import { Link, useNavigate } from 'react-router-dom';
function CandSidebar() {
    const navigae = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigae("/")
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                <ul className="optionsList">
                    <li className="option">
                        <HomeOutlined className="optionsIcon" />
                        <Link to="/CANDView" className="optionLink">Home</Link>
                    </li>

                    <li className="option">
                        <WorkIcon className="optionsIcon" />
                        <Link to="AppliedJobsScreen" className="optionLink">Applied Jobs</Link>
                    </li>
                    <li className="option"><Person4Icon className="optionsIcon" />
                        <Link to="EditCand" className="optionLink">Profile</Link>
                    </li>
                    <li className="option" onClick={logOut}>
                        <Logout className="optionsIcon" /><div className="optionLink">Log Out</div>
                    </li>

                </ul>
            </div>
        </div>
    )
}
export default CandSidebar