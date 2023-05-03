import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import '../hr_adminCard/hr_AdminCard.css'

const Hr_adminCard = (props) => {

    const hr_admin = props.hr_admin;

  return (
    <div>  <div>
    <Link to={`/show-hr_admin/${hr_admin._id}`}>
      <div className="jobCard">
        <div className="jobCardContainer">
          <div className="positionSpots">
            <div className="position"> {hr_admin.name}</div>
            <div className="spots"> {hr_admin.email} </div>
        

          </div>
        </div>
      </div>
    </Link>
  </div></div>
  )
}

export default Hr_adminCard