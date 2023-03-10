import { useParams } from 'react-router-dom';
import PatientJSON from '../database/patients.json';
import { useNavigate } from 'react-router-dom';
import '../Styles/container.scss';
import '../Styles/Search.scss';
import Navbar from './Navbar';

import * as React from 'react';


const PatientProfile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  //Get patient.json
  const patient = JSON.parse(JSON.stringify(PatientJSON));
  const info = patient.find((patient) => patient.id === id);

  return (
    <div>
      <Navbar />
      <div className='container card text-center'>
        <h1>
          {/* <img
            src={info.ava_url}
            alt=''
            className='round-img'
            style={{ width: '200px' }}
          /> */}
        </h1>

        <h1>
          {info.firstName} {info.lastName}
        </h1>

        <h2> Phone Number: {info.phoneNumber} </h2>

        {/* <div style={{ margin: '30px' }}>
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button onClick={handleSchedule}>Make appointment</Button>
            <Button onClick={handleReview}>Review</Button>
          </ButtonGroup>
        </div> */}

        {/* {reviewObject &&
          reviewObject.reviews.map(function (item, i) {
            return (
              <div>
                <p> ----------------- </p>
                <p> {item.email} </p>
                <p> {item.rating} </p>
                <h3> {item.review} </h3>
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default PatientProfile;
