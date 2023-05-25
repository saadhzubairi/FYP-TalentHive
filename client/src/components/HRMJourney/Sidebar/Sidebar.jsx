import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, Logout, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
function Sidebar() {
    const userId = localStorage.getItem("userId")
    const [HRM, setHRM] = useState({ _id: "n/a", pfpURL: "http://localhost:3000/assets/blank_pfp.png" })
    const [imageSrc, setImageSrc] = useState(HRM.pfpURL);
    const navigae = useNavigate();
    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await axios.get(`/hrms/${userId}`);
                setHRM(res.data);
                setImageSrc(res.data.pfpURL)
            } catch (e) {
                console.log(e);
            }
        };
        if (HRM._id === "n/a") {
            fetchHR()
        }

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const updateUserInfo = async () => {
            await delay(5000);
            fetchHR()
        }

        updateUserInfo()
    });

    const logOut = () => {
        localStorage.clear();
        navigae("/")
    }

    const handleImageError = () => {
        setImageSrc("http://localhost:3000/assets/blank_pfp.png");
    };
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src={imageSrc} alt="" onError={handleImageError} className="companyImage" />
                <div className="nameAndEmail">
                    <div className="HRTitle">{HRM.firstName} {HRM.lastName}</div>
                    <div className="HREmail">{HRM.email}</div>
                </div>
                <ul className="optionsList">

                    <li className="option">
                        <Link to={"/HRView"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <HomeOutlined className="optionsIcon" /><div className="optionLink">Home</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/HRView/createJob"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <PostAddOutlined className="optionsIcon" /><div className="optionLink">Post a job</div>
                        </Link>
                    </li>
                    {HRM.isAdmin ? <li className="option">
                        <Link to={"/HRView/EditCompany"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <GroupWorkOutlined className="optionsIcon" /><div className="optionLink">Company</div>
                        </Link>
                    </li> : null}
                    <li className="option">
                        <Link to={"/HRView/EditHr"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <CalendarMonthOutlined className="optionsIcon" /><div className="optionLink">Edit Info</div>
                        </Link>
                    </li>
                    <li className="option" onClick={logOut}>
                        <Logout className="optionsIcon" /><div className="optionLink">Log Out</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar