const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
  res.redirect('/patientlogin')
});

router.post('/', async (req, res) => {

  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  const { email, password } = req.body;
  const patient = patients.find((patient) => patient.email === email && patient.password === password);
  if (!patient) {
      res.json(null)
      return;
  }
  try {
      req.session.patientID = patient.id;
      res.json(patient)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;