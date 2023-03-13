import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Styles.Dashboard.scss'



const Dashboard = () => {

    const [backendData, setBackendData] = useState({})


    useEffect(() => {
      axios.get('/dashboard').then((response) => {
      setBackendData(response.data)
    })})


    return(

      <div className='Dashboard'>
        {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <Navbar/>
                  <h3> Please try logging in again</h3> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
              <div>
                <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender}/>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6">
                        <PatientUpcomingAppt patientId={backendData.data.id} firstName={backendData.data.firstName} lastName={backendData.data.lastName}/>
                      </div>
                      <div className="col-lg-6">
                        <img src={require("../Styles/img/background1.jpg")} alt="" width="500px" style={{marginTop:"20px", marginLeft:"20px"}} />
                        <h1>Easy Making appointment!</h1>
                        <p>Click to make appointment for medical service </p>
                        <div className='doctorName'>
                          <Link to='/searchdoctor'> <button className='button1'> Search doctor's name or specialty</button> </Link> <br/>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            )}
      </div>

    )}

        
export default Dashboard
