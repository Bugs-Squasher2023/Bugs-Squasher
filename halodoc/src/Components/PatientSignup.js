import React, {useState} from 'react';
import '../Styles/Styles.PatientSignup.scss';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const PatientSignup = () => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    number: '',
    Bdate: '',
    gender: '',
  });

  const [error, setError] = useState('');
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try{
      const response = await axios.post('/patientsignup', formValues);
      navigate(response.data.data)
    }
    catch (err){
      console.error(err);
      setError('There was an error with your signup');
    }

  };

    return(
        <div className='patientsignup'>
          <Navbar/>
          <div className="container">
            <div className="row">

              <div className="col-lg-6">
                <div className='text1'>
                  <h1> Straightforward and fast doctor appointment maker</h1>
                  <br/><br/>
                  <p className='text2' style={{ color: 'darkcyan' }}>Save your time and check your appointment calendar conveniently </p> <br/>
                  <div className='picture'>
                    <img src={require("../Styles/img/doctor_online_3.jpg")} alt="" width="300px" height="250px" />
                  </div>
                  
                </div>    
              </div>

              <div className="col-lg-6">
                <div className='signUp'>
                  <div className='signupContent'>
                    <h1 > Patient-signup</h1>
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="firstName">First name:</label><br />
                      <input type="text" name="firstName" placeholder="Your first name" value={formValues.firstName} onChange={handleInputChange} required/><br />

                      <label htmlFor="lastName">Last name:</label><br />
                      <input type="text" name="lastName" placeholder="Your last name"value={formValues.lastName} onChange={handleInputChange} required/><br />

                      <label htmlFor="email">Email:</label><br />
                      <input type="email" id="email" name="email" placeholder="Your email"value={formValues.email} onChange={handleInputChange} required/><br />
                      <label htmlFor="password">Password:</label><br />
                      <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleInputChange} required /><br />

                      <label htmlFor="number">Phone Number:</label><br />
                      <input type="text" name="number" placeholder="Your phone number"value={formValues.number} onChange={handleInputChange} required/><br />

                      <label htmlFor="Bdate">Birthday:</label><br />
                      <input type="date" name="Bdate" placeholder="Birthdate:"value={formValues.Bdate} onChange={handleInputChange} required/><br />

                      <label htmlFor="gender">Gender:</label><br />
                      <select name="gender" value={formValues.gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                      </select><br />

                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

        </div>

    )
}

export default PatientSignup