import { HomeOutlined, Login, Logout, PersonAdd } from "@mui/icons-material"
import WorkIcon from '@mui/icons-material/Work';
import Person4Icon from '@mui/icons-material/Person4';
import "./candSidebar.css"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios"

function CandSidebar() {
    const navigae = useNavigate();
    const [user, setUser] = useState({ _id: "n/a" })

    useEffect(() => {
        const getUser = async () => {
            await axios.get(`/candidate?id=${localStorage.getItem("userId")}`)
                .then((res) => setUser(res.data))
        }
        if (localStorage.getItem("userId")) { getUser(); }
    })

    const logOut = () => {
        localStorage.clear();
        navigae("/")
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="http://localhost:3000/assets/blank_pfp.png" alt="" className="companyImage" />
                <div className="CandName">{user._id === "n/a" ? "Welcome to Talent Hive" : `${user.name.fname} ${user.name.lname}`}</div>
                {user._id === "n/a" ? null : <div className="CandEmail">{user.email}</div>}
                <ul className="optionsList">

                    <li className="option">
                        <HomeOutlined className="optionsIcon" />
                        <Link to="/CANDView" className="optionLink">Home</Link>
                    </li>
                    {localStorage.getItem("userType") == 3 ?
                        <li className="option">
                            <WorkIcon className="optionsIcon" />
                            <Link to="AppliedJobsScreen" className="optionLink">Applied Jobs</Link>
                        </li> : null
                    }
                    {localStorage.getItem("userType") == 3 ?
                        <li className="option"><Person4Icon className="optionsIcon" />
                            <Link to="EditCand" className="optionLink">Profile</Link>
                        </li>
                        :
                        <li className="option"><PersonAdd className="optionsIcon" />
                            <Link to="ApplyJob/0" className="optionLink">Create Account</Link>
                        </li>
                    }

                    {localStorage.getItem("userType") == 3 ?
                        <li className="option" onClick={logOut}>
                            <Logout className="optionsIcon" /><div className="optionLink">Log Out</div>
                        </li>
                        :
                        <li className="option">
                            <Login className="optionsIcon" />
                            <Link to={"/"}><div className="optionLink">Log In</div></Link>
                        </li>
                    }

                </ul>
            </div>
        </div>
    )
}
export default CandSidebar