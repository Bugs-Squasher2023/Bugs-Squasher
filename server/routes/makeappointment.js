const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
  const appointment = req.body;
  // console.log(formData);
  
  let doctor_id;
  let patient_id;
  let pickTime;
  let pickDate;

  // Catch any blank request
  console.log(appointment);
  if(appointment) {
    doctor_id = appointment.doctor_id;
    patient_id = appointment.patient_id;
    pickTime = appointment.startTime;
    pickDate = appointment.date;
  }
  else {
    console.log("Error, blank appointment");
    return;
  }

  // Catch any read database error
  let filePathDoctor = '../halodoc/src/database/appointment/doctor/' + doctor_id.toString() + '.json';
  let filePathPatient = '../halodoc/src/database/appointment/patient/' + patient_id.toString() + '.json';
  console.log(filePathDoctor);
  try {
    let jsonDataDoctor = fs.readFileSync(filePathDoctor);
    let jsonDataPatient = fs.readFileSync(filePathPatient);
    dataDoctor  = JSON.parse(jsonDataDoctor);
    dataPatient = JSON.parse(jsonDataPatient);
  } catch (error) {
    console.log("Failed to read appointment database");
    return;
  }

  dataDoctor.push(appointment);
  dataPatient.push(appointment);
  dataDoctor.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  dataPatient.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  fs.writeFileSync(filePathDoctor, JSON.stringify(dataDoctor, null, 2) + '\n');
  fs.writeFileSync(filePathPatient, JSON.stringify(dataPatient, null, 2) + '\n');
  res.json({data: '/dashboard'});
  
});

module.exports = router;