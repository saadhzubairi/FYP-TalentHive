import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CompanyCard from '../companyComponents/companyCard/CompanyCard';

function ShowCompanyList() {
  
    const [companys, setCompanys] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/companys/company')
      .then((res) => {
        setCompanys(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowCompanyList');
      });
  }, []);

  const CompanyList =
    companys.length === 0
      ? 'there is no Company record!'
      : companys.map((company, k) => <CompanyCard company={company} key={k} />);
  
  
    return (
    
        <div className='ShowBookList'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <h2 className='display-4 text-center'>Company  List</h2>
            </div>
  
            <div className='col-md-11'>
              <Link
                to='/create-Company'
                className='btn btn-outline-warning float-right'
              >
                + Add New Company
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>
  
          <div className='list'>{CompanyList}</div>
        </div>
      </div>
  )
}

export default ShowCompanyList