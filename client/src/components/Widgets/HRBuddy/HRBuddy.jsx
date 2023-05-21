import axios from 'axios'
import './hRbuddy.css'
import { format } from "timeago.js"
import { useState } from 'react'
import { CircularProgress } from '@mui/material'

function HRBuddy({ HRM }) {

    const [loading, setLoading] = useState(false)
    const [isAdmin, setisAdmin] = useState(HRM.isAdmin)

    const makeAdmin = async () => {
        setLoading(true)
        await axios.put(`/hrms/${HRM._id}`, { isAdmin: true }).then(() => { setLoading(false); setisAdmin(true) })
    }

    const makeNotAdmin = async () => {
        setLoading(true)
        await axios.put(`/hrms/${HRM._id}`, { isAdmin: false }).then(() => { setLoading(false); setisAdmin(false) })
    }


    return (
        <div className="hrBuddy">
            <div className="hrBuddyWrapper">
                <div className="hrbuddyPicNameJoin">
                    <div className="hrbuddyPicture">
                        <img src={HRM.pfpURL} alt="" className="hrbuddypfp" />
                    </div>
                    <div className="hrBuddyNameJoin">
                        <div className="hrBuddyName">{HRM.firstName} {HRM.lastName}</div>
                        <div className="hrBuddyJoined">Joined {format(HRM.createdAt)}</div>
                    </div>
                </div>

                {loading ? <CircularProgress /> :
                    <div className="hrBuddyIsAdmin">
                        {isAdmin ?
                            <button onClick={makeNotAdmin} id='removeAdmin' className='hrBuddyMakeOrRemoveAdmin'>Remove Admin</button> :
                            <button onClick={makeAdmin} className='hrBuddyMakeOrRemoveAdmin'>Make Admin</button>
                        }
                    </div>}
            </div>
        </div >
    )
}
export default HRBuddy