const express = require('express');
const router = express.Router();
const patients = require('../../halodoc/src/database/patients.json');

router.get('/', (req, res) => {
  console.log('redirect to patientlogin')
});

router.post('/', async (req, res) => {
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