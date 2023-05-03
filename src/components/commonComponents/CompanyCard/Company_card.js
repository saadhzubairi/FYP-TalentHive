import React from 'react';
import { Link } from 'react-router-dom';

function Company_card({ userData }) {
  return (
    <Link to={`/companys/${userData._id}`}>
      <div className="card">
        <div className="card-header">
          
          <h2>{`${userData.location} ${userData.joined_date}`}</h2>
        </div>
        <div className="card-body">
          <p>{userData.email}</p>
          <p>{userData.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Company_card;





