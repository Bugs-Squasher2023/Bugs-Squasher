import React, {useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Styles.DoctorDashboard.scss'
import DoctorNavbar from './DoctorNavbar'

const DoctorDashboard = () => {
    let navigate = useNavigate();
    const [backendData, setBackendData] = useState({})

    useEffect(() => {
      axios.get('/doctorDashboard').then(function (response) {
      setBackendData(response.data)
    })}, [])

    return(
        <div>
            {(typeof backendData.data === 'undefined') ? (
                <div className='loading'>
                  <h2 className='loading-text'> Loading </h2>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              
              <div className='DoctorDashboard' >
                <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} />
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-2'>
                     
                    </div>
                    <div className='col-lg-8'>

                      {/* Greeting box (Good morning...) */}
                      <div className='Greetings'>
                        <div className='row'>
                          <div className='col-sm-9'>
                            <div className='greet-text'>
                            <h1> Good morning, <br/> Dr {backendData.data.firstName} {backendData.data.lastName}</h1>
                            <p> Have a nice day! </p>
                            </div>
                          </div>
                          <div className='col-sm-3'>
                            <img src={require("../Styles/img/doctor.png")} alt='' width='100%'></img>
                          </div>
                        </div>
                      </div>

                      {/* All features that doctor can redirect to - contains: all schedule, all patients, and edit info */}
                      <div className='DoctorDashboardInfo'>
                        <h2> Information </h2>
                        <div className='container'>
                          <div className='row'>
                            <div className='col'>
                              <button className="btn btn-light " onClick={() => navigate('/docschedule')}>  See your schedule 
                                <img src={require("../Styles/img/calendar_icon.png")} width='100%'/> 
                              </button> 
                              
                            </div>

                            <div className='col'> 
                                <button className="btn btn-light "> 
                                
                                  Show all patients 
                                  <img src={require("../Styles/img/patient.png") } width='100%'/>
                                  
                                </button>
                            </div>

                            <div className='col'> 
                              <button className="btn btn-light " onClick={() => navigate('/editavailability')}> Edit working hour 
                                <img src={require("../Styles/img/information.png") } width='100%'/>
                              </button>
                            </div>
                          </div>
                        </div>

                        </div>

                        {/* Today appointment */}
                        <div className='TodayAppointment'>
                          <h2> Today's appointment </h2>
                          <div className='container'>

                            <div className="card header">
                              <div className="card-body">
                                <div className='row'> 
                                  <div className='col-sm-3'> Patient name </div>
                                  <div className='col-sm-2'> Start time </div>
                                  <div className='col-sm-4'> Patient email </div>
                                  <div className='col-sm-3'> Patient birthday</div>
                                </div>
                              </div>
                            </div>
                        
                            {backendData.appointment
                              .sort((a, b) => a.startTime > b.startTime ? 1 : -1)
                              .map(appt => (
                              <div className="card">
                                <div className="card-body">
                                  <div className='row'> 
                                    <div className='col-sm-3'> {appt.patientName} </div>
                                    <div className='col-sm-2'> {appt.startTime} </div>
                                    <div className='col-sm-4'> {appt.patientEmail}</div>
                                    <div className='col-sm-3'> {appt.patientBirthday}</div>
                                  </div>
                                  
                                </div>
                              </div>
                            ))}
                    
                        </div>
                      </div>
                    </div>


                      

                    <div className='col-lg-2'> 
                      
                    </div>
                  </div>
                </div>
              </div>  
            )}
        </div>
    )
}

export default DoctorDashboard