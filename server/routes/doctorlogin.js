const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
});

router.post('/', async (req, res) => {
    let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))

    const { email, password } = req.body;
    const doctor = doctors.find((doctor) => doctor.email === email && doctor.password === password);
    if (!doctor) {
        res.json(null)
        return;
    }
    try {
        req.session.doctorID = doctor.id;
        res.json(doctor)
    } catch (err) {
      console.log(err)
    }
  });

module.exports = router;