import React, {useState} from 'react';
import '../Styles/Styles.PatientLogin.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';



const PatientLogin = () => {
    let navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        
        const response = await axios.post('/patientlogin', {
          email,
          password
        });
        console.log(response.data)
        if (response.data){
          navigate('/dashboard')
        } else {
          setError('Wrong credentials')
        }
   

      } catch (err) {
        console.error(err);
      }
    };
    
    

    return(
        
      <div className='patientlogin'>
        <Navbar/>

        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <div className='picture'>
                <img src={require("../Styles/img/patient.png")} alt="" width='400px'/>
              </div>
              
            </div>

            <div className="col-lg-6">
              <div className="patient-login-info">
                <h1> Patient login</h1>
                  <input type="text" placeholder="Username" id="patientUsername" onChange={e => setEmail(e.target.value)} required/>
                  <input type="password" placeholder="Password" id="patientPassword" onChange={e => setPassword(e.target.value)} required/>
                  {error}
                  <br/>
                  <button id='patientSubmit' onClick={handleSubmit}> Login </button>
                  <p> Don't have an account? <Link to='/patientsignup'> Sign up </Link> </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}

export default PatientLogin