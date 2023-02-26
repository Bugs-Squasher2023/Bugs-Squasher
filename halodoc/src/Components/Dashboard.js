import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';


const Dashboard = () => {
    const [backendData, setBackendData] = useState({})
    useEffect(() => {
    fetch("/dashboard").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
    }, [])


    return(
      
        <div>
            {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <Navbar/>
                  <h2> Please try logging in again</h2> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              <div>
                <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email}/>
                <PatientUpcomingAppt patientId={backendData.data.id} />
                <p> Find doctors </p>
                <input type="text"/>
                <button> Find </button>
                
                
              </div>  
            )}
        </div>
    )
}

export default Dashboard