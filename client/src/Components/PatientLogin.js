import React, {useState} from 'react';
import '../Styles/Styles.PatientLogin.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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
          <header>
              <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
          </header>
          <div className="container">
              <div className="surgeon-image">
                  <img src={require("../Styles/img/patient.png")} alt="" width="300px"/>
              </div>
              <div className="patient-login">
                  <h1> Patient login</h1>
                  <div className="patient-login-info">
                      <input type="text" placeholder="Username" id="patientUsername" onChange={e => setEmail(e.target.value)} required/>
                      <input type="password" placeholder="Password" id="patientPassword" onChange={e => setPassword(e.target.value)} required/>
                      {error} 
                      <button id='patientSubmit' onClick={handleSubmit}> Login </button>
                  </div>
                  <p> Don't have an account? Sign up </p>
              </div>
          </div> 
      </div>
        
    )
}

export default PatientLogin