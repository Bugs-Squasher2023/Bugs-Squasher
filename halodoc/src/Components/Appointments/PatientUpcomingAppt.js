import React, {useState, useEffect} from 'react';
import schedulesJson from '../../database/schedules.json'
import doctorsJson from '../../database/doctors.json'
import axios from 'axios';

import AppointmentInfo from './AppointmentInfo'
import '../../Styles/Styles.PatientUpcoming.scss'

const PatientUpcomingAppt = ({patientId,firstName,lastName}) => {

    const schedules = JSON.parse(JSON.stringify(schedulesJson));
    // const patients = JSON.parse(JSON.stringify(patientsJson));
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    
    const schedule = schedules.filter((schedule) => schedule.patient_id === patientId)
    const [loading, setLoading] = useState(true);
    const [backendData, setBackendData] = useState([]);

    const today = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    let myAppointments = []
    
    useEffect(() => {
        axios.get(`/patientUpcoming/${patientId}`)
        .then(({data}) => {
            setBackendData(data)
        })
    }, [])

    

    return(
        <div className=''>
            
            <h1>Welcome, {firstName} {lastName}! </h1>
            <p style={{color:"darkgreen"}}>Let's track your health daily!</p>
            <h3 style={{marginBottom:"30px",marginTop:"30px"}}>Today: {dateString} </h3>
            <h3> Upcoming Appointments </h3>
            <div className='grid'>
                {(typeof backendData.patientSchedule === 'undefined') ? (
                    <p> No upcoming appointments </p>
            
                ):(
                    <div>
                        {backendData.patientSchedule
                        
                        .map((appt,i) => (
                            <div key={i}>
                                <AppointmentInfo doctor_id = {appt.doctor_id} doctorName={appt.doctorName} specialty={appt.doctorSpecialty} startTime={appt.startTime} date={appt.date} pos={i}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
       
    )

}
export default PatientUpcomingAppt