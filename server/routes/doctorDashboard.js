const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', async (req, res) => {
  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))

  if (!req.session.doctorID) {
      return res.redirect('/doctorlogin');
    }
  const doctor = doctors.find((doctor) => doctor.id === req.session.doctorID);
  const fileName = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';
  let doctorSchedule = JSON.parse(fs.readFileSync(fileName));
  let today = new Date().toLocaleDateString()
  doctorSchedule = doctorSchedule.filter(item => new Date(item.date).getTime() === new Date(today).getTime())

  const newDocSchedule = doctorSchedule.map((appointments,i) => {
    const patient = patients.find(patient => patient.id === appointments.patient_id)
    const patientName = `${patient.firstName} ${patient.lastName}`;
    const patientEmail = `${patient.email}`;
    const patientBirthday = `${patient.Bdate}`;


    return { ...appointments, patientName, patientEmail, patientBirthday};
  })
  

  res.json({data: doctor, appointment: newDocSchedule})
});

module.exports = router;

