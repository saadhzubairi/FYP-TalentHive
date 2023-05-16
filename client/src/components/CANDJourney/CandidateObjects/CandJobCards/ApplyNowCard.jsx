import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        <button className="apply-now-button">Apply Now</button>
      </div>
    </div>
  );
};

export default Card;
