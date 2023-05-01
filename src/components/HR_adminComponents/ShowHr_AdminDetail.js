import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';


function ShowHr_AdminDetail(props) {

  const [hr_admin, setHr_admin] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/hr_admins/hr_admin/${id}`)
      .then((res) => {
        setHr_admin(res.data);
      })
      .catch((err) => {
        console.log('Error from showHrAdminDetailsList');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/hr_admins/hr_admin/${id}`)
      .then((res) => {
        navigate('/hr_admin');
      })
      .catch((err) => {
        console.log('Error form ShowHrAdminList_deleteClick');
      });
  };

  const Hr_adminItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>name</td>
            <td>{hr_admin.name}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Cid</td>
            <td>{hr_admin.Cid}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>hrId</td>
            <td>{hr_admin.hrId}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>email</td>
            <td>{hr_admin.email}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>joined_date</td>
            <td>{hr_admin.joined_date}</td>
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
              Show hr_admin List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>hr_admin's Record</h1>
            <p className='lead text-center'>View hr_admin's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{Hr_adminItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(hr_admin._id);
              }}
            >
              Delete hr_admin
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-hr_admin/${hr_admin._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit hr_admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowHr_AdminDetail