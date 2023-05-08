import React, { useEffect, useState } from 'react'
import "./jobAppCard.css"
import axios from 'axios'
import { format } from "timeago.js"
function JobAppCard({ app }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUser = async () => {
            axios.get(`/api/candidate?id=${app.candidateId}`).then(
                res => setUser(res.data)
            ).catch(
                err => console.log(err)
            )
        }
        getUser();

    }, [])

    return (
        <div className="jobAppCard">
            <div className="jobAppCardContainer">
                <div className="positionSpots">
                    <div className="position">
                        {user[0] ? `${user[0].name.fname} ${user[0].name.lname}` : "Loading..."}
                    </div>
                    <div className="spots">{format(app.createdAt)}</div>
                </div>
                <div className="applicationsCount">
                    <div className="rating">{app.rating}</div>
                </div>
            </div>
        </div>
    )
}
export default JobAppCard