import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateHr_Admin = (props) => {

    const navigate = useNavigate();
    const [hr_admin, setHr_admin] = useState({
      name: '',
      Cid: '',
      hrId: '',
      isActive: '',
      joined_date: '',
      email: '',
      logo:'',
      updated_date:''
    });
  
    const onChange = (e) => {
        setHr_admin({ ...hr_admin, [e.target.name]: e.target.value });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post('http://localhost:8082/api/hr_admins/hr_admin', hr_admin)
        .then((res) => {
            setHr_admin({
                name: '',
                Cid: '',
                hrId: '',
                isActive: '',
                joined_date: '',
                email: '',
                logo:'',
                updated_date:''
          });
  
          // Push to /
          navigate('/');
        })
        .catch((err) => {
          console.log('Error in CreateBook!');
        });
    };

  return (
    <div> <div className='CreateBook'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <br />
          <Link to='/' className='btn btn-outline-warning float-left'>
            Show hr_admin List
          </Link>
        </div>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Add hr_admin</h1>
          <p className='lead text-center'>Create new hr_admin</p>

          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='name'
                name='name'
                className='form-control'
                value={hr_admin.name}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <input
                type='text'
                placeholder='Cid '
                name='Cid'
                className='form-control'
                value={hr_admin.Cid}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='hr_id'
                name='hr_id'
                className='form-control'
                value={hr_admin}
                onChange={onChange}
              />
            </div>

    

            <div className='form-group'>
              <input
                type='date'
                placeholder='joined_date'
                name='joined_date'
                className='form-control'
                value={hr_admin.joined_date}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Email..'
                name=' email'
                className='form-control'
                value={hr_admin.email}
                onChange={onChange}
              />
            </div>

            <input
              type='submit'
              className='btn btn-outline-warning btn-block mt-4'
            />
          </form>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default CreateHr_Admin