import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import WorkIcon from '@mui/icons-material/Work';
import Person4Icon from '@mui/icons-material/Person4';
import "./sidebar.css"

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                <ul className="optionsList">
                    <li className="option"><HomeOutlined className="optionsIcon" /><a href="/" className="optionLink">Home</a></li>
                    <li className="option">
                        <WorkIcon className="optionsIcon" />
                        <a to="/" className="optionLink">Applied Jobs</a>
                    </li>
                    <li className="option"><Person4Icon className="optionsIcon" /><a href="" className="optionLink">Profile</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar