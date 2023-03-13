const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/', async (req, res) => {
  const formData = req.body;
  let data; 
  //error handling for when the file doesn't exist
  //if (fs.existsSync(filePath)) {
  //  const jsonData = fs.readFileSync(filePath);
  //  data = JSON.parse(jsonData);
  //} else {
  //  fs.writeFileSync(filePath, JSON.stringify(data));
  //}

  //error handling for when patients.json is empty so it wouldn't throw an error in parse module
  //it should also be done in other posts it will catch the error if error handling is also done in other posts
  //this still reads the whole databse with each submission. I couldn't find a better way to do it? 

  
  //Handle case that patient already existed
  

  try {
    let jsonData = fs.readFileSync('../halodoc/src/database/patients.json');
    data  = JSON.parse(jsonData);

  } catch (error) {
    data = [];
    console.log('New database initialized.');
  }
  const patient = data.find((patient) => patient.email === formData.email);

  if (patient) {
      console.log("Patient already exist")
      res.json(null)
      return;
  }

  let lastPatientId = data.length > 0 ? parseInt(data[data.length-1].id): 0;
  let newPatientId = lastPatientId + 1; 

  const newPatient = {
    id: newPatientId.toString(),
    ...formData
  }
  data.push(newPatient);
  fs.writeFileSync('../halodoc/src/database/patients.json', JSON.stringify(data, null, 2) + '\n');

  const newFile = '../halodoc/src/database/appointment/patient/' + newPatient.id + '.json'
  fs.writeFile(newFile, JSON.stringify([]), err => {
    if (err) {
      console.error(err);
      return;
    }
  })

  res.json({data: '/patientlogin'});
  
});

module.exports = router;

