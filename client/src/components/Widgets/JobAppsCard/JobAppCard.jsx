import React, { useEffect, useState } from 'react'
import "./jobAppCard.css"
import axios from 'axios'
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
function JobAppCard({ app }) {
    const [user, setUser] = useState({ _id: "n/a" })
    useEffect(() => {
        const getUser = async () => {
            axios.get(`/candidate?id=${app.candidateId}`).then(
                res => setUser(res.data)
            ).catch(
                err => console.log(err)
            )
        }
        getUser();

    }, [])

    return (

        <div className="jobAppCard">
            <Link to={`/ViewCandidate/${app._id}`} style={{ textDecoration: "none" }}>
                <div className="jobAppCardContainer">
                    <div className="positionSpots">
                        <div className="position">
                            {user._id === "n/a" ? <LinearProgress /> : `${user.name.fname} ${user.name.lname}`}
                        </div>
                        <div className="spots">{format(app.createdAt)}</div>
                    </div>
                    <div className="applicationsCount">
                        <div className="rating">{app.rating}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default JobAppCard