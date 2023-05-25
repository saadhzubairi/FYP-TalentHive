import { NotificationAdd } from '@mui/icons-material'
import "./candRightBar.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import CandAppNotifCard from '../Widgets/CandAppNotifCard/CandAppNotifCard'
function CandRightBar(props) {
    const [apps, setApps] = useState([])
    useEffect(() => {
        const getApps = () => {
            axios.get(`/jobApplications?candidateId=${localStorage.getItem("userId")}`)
                .then((res) => setApps(res.data))
                .catch(err => console.log(err))
        }
        getApps();
    })

    return (
        <div className="rightbar">
            <div className="topContainer">
                <div className="topHeading"><NotificationAdd /> Notifications</div>
            </div>
            <div className="notifsList">
                {apps.map((a) => <CandAppNotifCard app={a} />)}
            </div>
        </div>
    )
}
export default CandRightBar