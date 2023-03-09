

import React from 'react';
import '../Styles/Styles.Introduction.scss';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';

const Introduction = () => {
  return (
    <div className='introduction'>
      <Navbar/>

      <div className="container">
        <div className="row">

          <div className="col-lg-7">
            <div className='text'>
              <h1> Appointment with your doctors made easy! </h1>
              <p className='text2' style={{ color: 'darkcyan' }}> Skip calling and make appointments with your doctors just through a few clicks </p>
              <Link to='/patientLogin'> <button className='button button1'> Sign In</button> </Link>
              <Link to='/patientsignup'> <button className='button button2'>Sign up</button> </Link>
            </div>
            
          </div>

          <div className="col-lg-5">
            <div className='picture'>
              <img src={require('../Styles/img/cardiologist.jpg')} alt='' width='100%' />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Introduction;
