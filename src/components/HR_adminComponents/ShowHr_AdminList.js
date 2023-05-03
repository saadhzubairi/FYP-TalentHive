import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Hr_adminCard from './hr_adminCard/Hr_adminCard';

function ShowHr_AdminList() {

     
    const [hr_admins, setHr_admins] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/hr_admins/hr_admin')
      .then((res) => {
        setHr_admins(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowCompanyList');
      });
  }, []);

  const Hr_adminList =
    hr_admins.length === 0
      ? 'there is no Company record!'
      : hr_admins.map((hr_admin, k) => <Hr_adminCard hr_admin={hr_admin} key={k} />);
  


  return (
    <div>  <div className='ShowBookList'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <br />
          <h2 className='display-4 text-center'>Hr_admin  List</h2>
        </div>

        <div className='col-md-11'>
          <Link
            to='/create-hr_admin'
            className='btn btn-outline-warning float-right'
          >
            + Add New Hr_admin
          </Link>
          <br />
          <br />
          <hr />
        </div>
      </div>

      <div className='list'>{Hr_adminList}</div>
    </div>
  </div></div>
  )
}

export default ShowHr_AdminList