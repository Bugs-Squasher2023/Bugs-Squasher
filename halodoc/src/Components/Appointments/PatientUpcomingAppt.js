import React, {useState} from 'react'
import schedulesJson from '../../database/schedules.json'
import patientsJson from '../../database/patients.json'
import doctorsJson from '../../database/doctors.json'
import AppointmentInfo from './AppointmentInfo'

const PatientUpcomingAppt = ({patientId}) => {

    const schedules = JSON.parse(JSON.stringify(schedulesJson));
    const patients = JSON.parse(JSON.stringify(patientsJson));
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    // console.log(patients)
    
    const schedule = schedules.filter((schedule) => schedule.patient_id === patientId)

    let myAppointments = [];
    

        
    for (let i = 0; i < schedule.length; ++i){
        const thisDoctor = doctors.find((doctor) => doctor.id === schedule[i].doctor_id)
        // console.log(thisDoctor.firstName)
        // console.log(thisDoctor.lastName)
        // console.log(schedule[i].startTime)
        // console.log(schedule[i].month+1 + '/' + schedule[i].date + '/' + schedule[i].year)

        myAppointments.push({
            doctorName: thisDoctor.firstName + ' ' + thisDoctor.lastName,
            time: schedule[i].startTime,
            date: schedule[i].month+1 + '/' + schedule[i].date + '/' + schedule[i].year
        })
    
    }
    
 

    return(
        <div>
            <h2> Upcoming Appointments </h2>
            <p> Will be shown here </p>
            {myAppointments.map((appointment, i) => (
                <AppointmentInfo key={i} doctorName={appointment.doctorName} time={appointment.time} date={appointment.date}/>
            ))}
        </div>
       
    )

}
export default PatientUpcomingAppt