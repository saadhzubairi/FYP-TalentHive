import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                <ul className="optionsList">
                    <li className="option"><HomeOutlined className="optionsIcon"/><a href="" className="optionLink">Home</a></li>
                    <li className="option"><PostAddOutlined className="optionsIcon"/><a href="" className="optionLink">Post a job</a></li>
                    <li className="option"><CalendarMonthOutlined className="optionsIcon"/><a href="" className="optionLink">Interviews</a></li>
                    <li className="option"><GroupWorkOutlined className="optionsIcon"/><a href="" className="optionLink">Collaboration</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar