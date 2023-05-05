import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"
import { Link } from "react-router-dom"
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                <ul className="optionsList">

                    <li className="option">
                        <Link to={"/"} style={{ textDecoration: "none", alignItems: "center" , display:"flex"}} >
                            <HomeOutlined className="optionsIcon" /><div className="optionLink">Home</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/createJob"}  style={{ textDecoration: "none", alignItems: "center" , display:"flex"}} >
                            <PostAddOutlined className="optionsIcon" /><div className="optionLink">Post a job</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={""}  style={{ textDecoration: "none", alignItems: "center" , display:"flex"}} >
                            <GroupWorkOutlined className="optionsIcon" /><div className="optionLink">Collaboration</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/EditHr"}  style={{ textDecoration: "none", alignItems: "center" , display:"flex"}} >
                            <CalendarMonthOutlined className="optionsIcon" /><div className="optionLink">Edit Info</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar