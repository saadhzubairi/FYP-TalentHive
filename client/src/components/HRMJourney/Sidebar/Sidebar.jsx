import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
function Sidebar() {
    
    const [HRM, setHRM] = useState({ _id: "n/a", pfpURL: "http://localhost:3000/assets/blank_pfp.png" })
    const [imageSrc, setImageSrc] = useState(HRM.pfpURL);
    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await axios.get("/hrms/644f10bbbbd3951b057a3c6f");
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

    const handleImageError = () => {
        setImageSrc("http://localhost:3000/assets/blank_pfp.png");
    };
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src={imageSrc} alt="" onError={handleImageError} className="companyImage" />
                <div className="nameAndEmail">
                    <div className="companyTitle">{HRM.firstName} {HRM.lastName}</div>
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
                    <li className="option">
                        <Link to={"/HRView"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <GroupWorkOutlined className="optionsIcon" /><div className="optionLink">Collaboration</div>
                        </Link>
                    </li>
                    <li className="option">
                        <Link to={"/HRView/EditHr"} style={{ textDecoration: "none", alignItems: "center", display: "flex" }} >
                            <CalendarMonthOutlined className="optionsIcon" /><div className="optionLink">Edit Info</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar