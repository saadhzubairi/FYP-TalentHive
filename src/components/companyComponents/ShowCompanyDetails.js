import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';


function ShowCompanyDetails(props) {

  const [company, setCompany] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/companys/${id}`)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowCompanyDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/companys/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowCompanyDetails_deleteClick');
      });
  };

  const CompanyItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Title</td>
            <td>{company.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Locatioin</td>
            <td>{company.location}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Cid</td>
            <td>{company.Cid}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Email</td>
            <td>{company.email}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Joined Date</td>
            <td>{company.joined_date}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Description</td>
            <td>{company.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (


    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Company List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Company's Record</h1>
            <p className='lead text-center'>View Company's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{CompanyItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(company._id);
              }}
            >
              Delete Company
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-company/${company._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit company
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowCompanyDetails