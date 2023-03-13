import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Introduction from './Components/Introduction';
import PatientLogin from './Components/PatientLogin';
import DoctorLogin from './Components/DoctorLogin';
import PatientSignup from './Components/PatientSignup';
import React from 'react';
import Dashboard from './Components/Dashboard';
import DoctorDashboard from './Components/DoctorDashboard';
import DoctorSignUp from './Components/DoctorSignup';
import DoctorProfile from './Components/DoctorProfile';
import Review from './Components/Review';
import Schedule from './Components/Appointments/Schedule';
import RunSearch from './Components/Search/RunSearch';

import DocSchedule from './Components/Appointments/DocSchedule';
import SearchDoctor from './Components/SearchDoctor';
// import MakeAppointment from './Components/Appointments/MakeAppointment';
import PatientProfile from './Components/PatientProfile';
import MakeAppointmentByDoctor from './Components/Appointments/MakeAppointmentByDoctor';
import EditAvailbility  from './Components/EditAvailability';
import AddPatient from './Components/AddPatient';


function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Introduction/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/searchdoctor' element={<SearchDoctor />}/>
        <Route path='/Introduction' element={<Introduction />}/>
        <Route path='/RunSearch' element={<RunSearch />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/doctorDashboard' element={<DoctorDashboard />}/>
        <Route path='/patientLogin' element={<PatientLogin />}/>
        <Route path='/doctorLogin' element={<DoctorLogin />}/>
        <Route path='/patientsignup' element={<PatientSignup />}/>
        <Route path='/doctorsignup' element={<DoctorSignUp />}/>
        <Route path='/doctors/:id' element={<DoctorProfile />} />
        <Route path='/review/doctor/:id' element={<Review />} />
        <Route path='/schedule/:id' element={<Schedule />} />
        <Route path='/docschedule' element={<DocSchedule />} />
        {/* <Route path='/makeappointment/:date/:hour' element={<MakeAppointment />} /> */}
        <Route path='/patientprofile/:id' element={<PatientProfile />} />
        <Route path='/makeappointmentbydoctor/:date/:hour' element={<MakeAppointmentByDoctor />} />
        <Route path='/editavailability'  element={<EditAvailbility />} />
        <Route path= '/addpatient' element={<AddPatient/>}/>
    
      </Routes>
    </Router>
  );
}

export default App;
