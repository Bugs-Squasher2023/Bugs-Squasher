const express = require('express');
const session = require("express-session");

const patients = require('./client/src/database/patients.json');


const app = express();
app.use(express.json())

app.use(session({
    secret: 'mySecretKey', // replace with your own secret key
    resave: false,
    saveUninitialized: true
  }));

app.get('/api', (req, res) => {res.json({msg: 'Hello World'})});

app.get('/patientlogin', (req, res) => {
    res.redirect('/patientlogin');
});

app.post('/patientlogin', async (req, res) => {
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

app.post('/logout', (req, res) => {
    req.session.patientID = null; // deletes the patientID property from the session object
    console.log('Post logout')
    res.json({data: '/patientlogin'});
});

app.get('/dashboard', async (req, res) => {
    console.log(req.session.patientID)
    if (!req.session.patientID) {
        return res.redirect('/patientlogin');
      }
    const patient = patients.find((patient) => patient.id === req.session.patientID);
    res.json({data: patient})
  });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`server starting on port ${PORT}`)});