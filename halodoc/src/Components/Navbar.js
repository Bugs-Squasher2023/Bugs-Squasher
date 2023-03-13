import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../Styles/Styles.Dashboard.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



const Navbar = ({name, email,patientID,gender}) => {
  let navigate = useNavigate();

  const handlePatient = async (e) => {
    console.log("jump tp patient profile")
    navigate(`/patientprofile/${patientID}`);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log('Click logout');
    try {
      const response = await axios.post('/patientlogout');
      console.log(response.data.data);
      navigate(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
       ]

          {/* If not logged in then logo return to Introduction page, if logged in then logo return to dashboard */}
          {(typeof name !== 'undefined') ? (
            <Link className="navbar-brand" to='/dashboard'>
              <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="250px"  />
            </Link>
          ):(<Link className="navbar-brand" to='/'>
              <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="250px"  />
            </Link>)}



          {/* If logged in then show the logo of the user on the top right*/}
          {(typeof name !== 'undefined') ? (
          <div className="ms-auto">

            <div className="dropdown ">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={require(`../Styles/img/${gender}.png`)} alt={`Avatar for patient ${gender}`} className='profile' style={{ borderRadius: '50%', width:'50px' }}></img>
              </button>

              <div
                className='dropdown-menu dropdown-menu-end dropdown-menu-right'
                aria-labelledby='dropdownMenuButton'
              >
                <p 
                  className='dropdown-item text-right' 
                  onClick={handlePatient } style={{ cursor: 'pointer' }}
                >
                  {' '}
                  {name} <br />
                  {email}{' '}
                </p>
                <p className='dropdown-item text-right' 
                    onClick={() => {navigate('/dashboard');}} style={{ cursor: 'pointer' }}>
                  {' '}
                  Back to dashboard
                </p>
                <p
                  className='dropdown-item text-right'
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                  Log out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
