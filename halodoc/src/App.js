import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Introduction from './Components/Introduction'
import PatientLogin from './Components/PatientLogin'
import PatientSignup from './Components/PatientSignup'
import React from 'react'
import Dashboard from './Components/Dashboard';
import DoctorSignUp from './Components/DoctorSignup';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Introduction/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/patientLogin' element={<PatientLogin/>}></Route>
        <Route path='/patientsignup' element={<PatientSignup/>}></Route>
        <Route path='/doctorsignup' element={<DoctorSignUp/>}></Route>
      </Routes>
    </Router>
    
    
  );
}

export default App;
