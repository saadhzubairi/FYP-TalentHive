import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';


function UpdateCompanyInfo() {

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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/companys/${id}`)
      .then((res) => {
        setCompany({
          title: res.data.title,
          Cid: res.data.Cid,
          location: res.data.location,
          description: res.data.description,
          joined_date: res.data.joined_date,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateCompanyInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: company.title,
      Cid: company.Cid,
      location: company.location,
      description: company.description,
      joined_date: company.joined_date,
      email: company.email,
    };

    axios
      .put(`http://localhost:8082/api/companys/${id}`, data)
      .then((res) => {
        navigate(`/show-company/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateCompanyInfo!');
      });
  };


  return (
    <div> <div className='UpdateBookInfo'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <br />
          <Link to='/' className='btn btn-outline-warning float-left'>
            Show Company List
          </Link>
        </div>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Edit Company</h1>
          <p className='lead text-center'>Update Company's Info</p>
        </div>
      </div>

      <div className='col-md-8 m-auto'>
        <form noValidate onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              placeholder='Title of the Book'
              name='title'
              className='form-control'
              value={company.title}
              onChange={onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <label htmlFor='isbn'>Cid</label>
            <input
              type='text'
              placeholder='Cid'
              name='Cid'
              className='form-control'
              value={company.Cid}
              onChange={onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <label htmlFor='author'>location</label>
            <input
              type='text'
              placeholder='Location'
              name='location'
              className='form-control'
              value={company.location}
              onChange={onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              placeholder='Description of the Book'
              name='description'
              className='form-control'
              value={company.description}
              onChange={onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <label htmlFor='published_date'>Joined Date</label>
            <input
              type='text'
              placeholder='Joined Date'
              name='joined_date'
              className='form-control'
              value={company.joined_date}
              onChange={onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <label htmlFor='publisher'>email</label>
            <input
              type='text'
              placeholder='Email'
              name='email'
              className='form-control'
              value={company.email}
              onChange={onChange}
            />
          </div>
          <br />

          <button
            type='submit'
            className='btn btn-outline-info btn-lg btn-block'
          >
            Update Company
          </button>
        </form>
      </div>
    </div>
  </div></div>
  )
}

export default UpdateCompanyInfo