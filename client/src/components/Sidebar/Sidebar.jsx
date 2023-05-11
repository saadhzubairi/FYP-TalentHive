import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
function Sidebar() {
    const [HRM, setHRM] = useState({ _id: "n/a" })

    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await axios.get("/hrms/644f10bbbbd3951b057a3c6f");
                setHRM(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        if (HRM._id === "n/a") {
            fetchHR()
        }
    });

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src={HRM.pfpURL} alt="" className="companyImage" />
                <div className="companyTitle">{HRM.firstName} {HRM.lastName}</div>
                <ul className="optionsList">

                    <li className="option">
                        <Link to={"/"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <HomeOutlined className="optionsIcon" /><div className="optionLink">Home</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/createJob"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <PostAddOutlined className="optionsIcon" /><div className="optionLink">Post a job</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={""} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <GroupWorkOutlined className="optionsIcon" /><div className="optionLink">Collaboration</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/EditHr"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <CalendarMonthOutlined className="optionsIcon" /><div className="optionLink">Edit Info</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar