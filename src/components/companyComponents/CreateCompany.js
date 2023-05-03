import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateCompany = (props) => {

    const navigate = useNavigate();
    const [company, setCompany] = useState({
      title: '',
      Cid: '',
      location: '',
      description: '',
      joined_date: '',
      email: '',
      logo:'',
      updated_date:''
    });
  
    const onChange = (e) => {
      setCompany({ ...company, [e.target.name]: e.target.value });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post('http://localhost:8082/api/companys/company', company)
        .then((res) => {
          setCompany({
            title: '',
            Cid: '',
            location: '',
            description: '',
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
        <div className='CreateBook'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show Company List
                </Link>
              </div>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Company</h1>
                <p className='lead text-center'>Create new Company</p>
    
                <form noValidate onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Title of the Company'
                      name='title'
                      className='form-control'
                      value={company.title}
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
                      value={company.Cid}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Location'
                      name='location'
                      className='form-control'
                      value={company.location}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Description of the company '
                      name='description'
                      className='form-control'
                      value={company.description}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='date'
                      placeholder='joined_date'
                      name='joined_date'
                      className='form-control'
                      value={company.joined_date}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Email..'
                      name=' email'
                      className='form-control'
                      value={company.email}
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
        </div>
      );
}

export default CreateCompany;