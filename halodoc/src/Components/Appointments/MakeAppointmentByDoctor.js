import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
const patients = require('../../database/patients.json');



const MakeAppointmentByDoctor = () => {
    let{date, hour} = useParams(); 

    const patientOptions = [];

    const patientsData = JSON.parse(JSON.stringify(patients));
        for (let patient of patientsData){ //important the difference between and in in 
            const option = { value: `${patient.id}`, label: `${patient.firstName} ${patient.lastName} ${patient.Bdate}`}
            patientOptions.push(option);
        
      } 


    const [formValues, setFormValues] = useState({
        patientID: '',

    });


    
    const [error, setError] = useState('');


    // a generic function to handle input change
    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormValues({
    //         ...formValues,
    //         [name]: value
    //     });

    // };

    const handleSelectedPatient = (selectedOptions) => {
      const selectedValue = selectedOptions.value;
      setFormValues({ patientID : `${selectedValue}`, });
    };


    let dateObj = new Date(date);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try{
          const response = await axios.post(`/makeappointmentbydoctor/${dateObj}/${hour}`, formValues);

          console.log(dateObj);
          console.log(response.data);
          if(response.status === 200){
            console.log('successful')
          } else {
            setError('There was an error with your signup')
          }
        }
        catch (err){
          console.error(err);
          setError('There was an error with your signup');
        }
    
      };

        return(
            <div>
              <section>
                <div className="makeAppt">
                  <h1 >Add appointment to {dateObj.getMonth() + 1}/{dateObj.getDate()}/{dateObj.getFullYear()} at {hour} </h1>
                  <form onSubmit={handleSubmit}>
                    <label>Choose a patient</label>
                      <Select options={patientOptions} onChange={handleSelectedPatient} required/>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </section>  

          </div>

        )
}

export default MakeAppointmentByDoctor;