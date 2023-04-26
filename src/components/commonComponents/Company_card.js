import React from 'react';
import { Link } from 'react-router-dom';

function Company_card({ userData }) {
  return (
    <Link to={`/company/${userData.id}`}>
      <div className="card">
        <div className="card-header">
          <img src={userData.picture.large} alt={userData.name.first} />
          <h2>{`${userData.name.first} ${userData.name.last}`}</h2>
        </div>
        <div className="card-body">
          <p>{userData.email}</p>
          <p>{userData.cell}</p>
        </div>
      </div>
    </Link>
  );
}

export default Company_card;





