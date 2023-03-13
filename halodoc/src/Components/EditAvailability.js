import React, {useState, useEffect}  from 'react';
import Select from 'react-select';
import axios from 'axios';
import DoctorNavbar from './DoctorNavbar';
import { useNavigate } from "react-router-dom";

const EditAvailbility = () => {
    const navigate = useNavigate()

    const [error, setError] = useState('');

    const [backendData, setBackendData] = useState({})
    const [formValues, setFormValues] = useState({
      newStartHour: '',
      newStartMinute: '',
      newEndHour: '',
      newEndMinute: '',
      newInterval: '',
      newDaysOff: [],

  });

    useEffect(() => {
      axios.get('/doctorDashboard').then(function (response) {
      setBackendData(response.data);

      setFormValues ({
        newStartHour: response.data.data.startTime.substr(0,2),
        newStartMinute: response.data.data.startTime.substr(3,2),
        newEndHour: response.data.data.endTime.substr(0,2),
        newEndMinute: response.data.data.endTime.substr(3,2),
        newInterval: response.data.data.appointmentInterval,
        newDaysOff: response.data.data.dayOffs,
      })
    })}, [])

    
    const handleInputChange = (selectedOptions, e) => {
        const name = e.name;
        const value = selectedOptions.value.toString();
 
        setFormValues({
            ...formValues,
            [name]: value
        });
        
    };

    const handleSubmit = async (e) => {
            e.preventDefault(); 
    
            try{
              const response = await axios.post(`editavailability`, formValues);
              navigate(response.data);
            }
            catch (err){
              console.error(err);
              setError('There was an error with your signup')
            }

    };
    const handleDaysOffChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormValues({
          ...formValues,
          newDaysOff: selectedValues
        });
      };

    const options = [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' }
      ]

    const hoursArray = Array.from({ length: 24 }, (_, index) => {
      const hour = index < 18 ? index + 7 : index - 17;
      return { value: hour, label: `${hour}` };
    });


    const minutesArray = Array.from({ length: 12 }, (_, index) => {
      const minute = index * 5;
      return { value: minute, label: `${minute}` };
    });

    const intervalArray = Array.from({ length: 24 }, (_, index) => {
      const interval = (index + 1) * 5;
      return { value: interval, label: `${interval}` };
    });

        return(
        <div>
         {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <h2> Please try logging in again</h2> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              <div>
        <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} />

        <div className='container'>
            <section>
              <div className="editAvailability">
                <h2 >Change your working hour and appointment interval</h2>
                <form onSubmit={handleSubmit}>
                    <div className='row'> 
                      <div className='col'>
                        <label htmlFor="newStartHour">Start Time Hour:</label><br />
                        <Select options={hoursArray} name="newStartHour" onChange={handleInputChange} defaultInputValue={formValues.newStartHour} />
                      </div>
                      <div className='col'>
                        <label htmlFor="newStartMinute">Start Time Minute:</label><br />
                        <Select options={minutesArray} name="newStartMinute" onChange={handleInputChange} defaultInputValue={formValues.newStartMinute} />
                      </div>
                      <div className='col'>
                        <label htmlFor="newEndHour">End Time Hour:</label><br />
                        <Select options={hoursArray}  name="newEndHour" onChange={handleInputChange} defaultInputValue={formValues.newEndHour} />
                      </div>
                      <div className='col'>
                        <label htmlFor="newEndMinute">End Time Minute:</label><br />
                        <Select options={minutesArray} name="newEndMinute" onChange={handleInputChange} defaultInputValue={formValues.newEndMinute} />
                      </div>
                    </div>

                    <div className='row'> 
                      <div className='col'>
                        <label htmlFor="newinterval">Appointment Interval in minutes:</label><br />
                        <Select options={intervalArray} name="newInterval" onChange={handleInputChange} defaultInputValue={formValues.newInterval.toString()} />
                      </div>
                      <div className='col'>
                        <label htmlFor="newDaysOff">Select your days off:</label><br />
                        <Select options={options} isMulti onChange={handleDaysOffChange} />
                      </div>
                     
                    </div>
                    

                    

                    

                    
                    
        
                    <button type="submit">Submit</button>
                </form>
        
              </div>
            </section>

            {/* <section>
              <div className ="text1">
              <h1>Provide strightforwad,fast medical appointment service</h1>
              <br/><br/>
              <h2>Save your Time and checky your appointment calendar Conveniently </h2> <br/>


              </div>
            </section>      */}

          </div>
          </div>
            )
        
        
        
         }
        </div>)
}


export default EditAvailbility;