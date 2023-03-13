import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import RunSearch from "./Search/RunSearch"
import '../Styles/Styles.Dashboard.scss'



const SearchDoctor = () => {
    const [backendData, setBackendData] = useState({})
    useEffect(() => {
        axios.get('/dashboard').then((response) => {
        setBackendData(response.data)
      })})
    return(
        <div className='Dashboard'>
            {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <Navbar/>
                  <h3> Please try logging in again</h3> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
                <div>
                    <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender}/>
                    <RunSearch />
                </div>
            )}
            
        </div>
    )
}

export default SearchDoctor