import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import "../companyCard/companycard.css";

const CompanyCard = (props) => {
  const company = props.company;

  return (
    <div>
      <Link to={`/show-company/${company._id}`}>
        <div className="jobCard">
          <div className="jobCardContainer">
            <div className="positionSpots">
              <div className="position"> {company.title}</div>
              <div className="spots"> {company.location} </div>
             

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CompanyCard;
