import React from 'react'
import "./jobAppCard.css"
function JobAppCard(props) {
    return(
        <div className="jobAppCard">
            <div className="jobAppCardContainer">
                <div className="positionSpots">
                    <div className="position">Saddam Hussain</div>
                    <div className="spots">5 days ago</div>
                </div>
                <div className="applicationsCount">
                    <div className="count">4.5</div>
                </div>
            </div>
        </div>
    )
}
export default JobAppCard