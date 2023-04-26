import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';


const CompanyCard = (props) => {
    const company = props.company;
  
    return (
      <div className='card-container'>
        <img
          src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
          alt='Books'
          height={200}
        />
        <div className='desc'>
          <h2>
            <Link to={`/show-book/${company._id}`}>{company.title}</Link>
          </h2>
          <h3>{company.email}</h3>
          <p>{company.description}</p>
        </div>
      </div>
    );
  };
  
  export default CompanyCard;