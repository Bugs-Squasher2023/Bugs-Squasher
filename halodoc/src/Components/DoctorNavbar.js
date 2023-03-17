import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Styles.Dashboard.scss';

const DoctorNavbar = ({name, email, id, url}) => {
  let navigate = useNavigate(); 

  const handleLogout= async (e) => {
    
      e.preventDefault();
      try {
        const response = await axios.post('/doctorlogout');
        navigate(response.data.data)
      } catch (err) {
        console.error(err);
      }
    };

  return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          {/* If not logged in then logo return to Introduction page, if logged in then logo return to dashboard */}
          {(typeof name !== 'undefined') ? (
            <Link className="navbar-brand" to='/doctordashboard'> 
              <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="250px"  />
            </Link>
          ):(<Link className="navbar-brand" to='/'> 
              <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="250px"  />
            </Link>)}
          

          
          {/* If logged in then show the logo of the user on the top right*/}
          {(typeof name !== 'undefined') ? (
          <div className="ms-auto">

            <div className="dropdown ">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={url} alt='' className='profile' style={{ borderRadius: '50%', width:'50px' }}></img>
                
              </button>

              <div className="dropdown-menu dropdown-menu-end dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <p className="dropdown-item text-right" onClick={() => {navigate(`/doctorprofile/${id}`)}}> {name} <br/>{email} </p>
                <p className="dropdown-item text-right" onClick={() => {navigate('/doctordashboard')}} style={{cursor:'pointer'}}> Back to dashboard</p>
                <p className="dropdown-item text-right" onClick={() => {navigate('/docschedule')}} style={{cursor:'pointer'}}> View all schedule</p>
                <p className="dropdown-item text-right" onClick={() => {navigate('/addpatient')}} style={{cursor:'pointer'}}> Add new patient </p>
                <p className="dropdown-item text-right" onClick={handleLogout} style={{cursor:'pointer'}}> Log out</p>
              </div>
            </div>
            
          </div>
          ):(
            <div></div>
          )}


        </nav>
      </div>
          

  )
}

export default DoctorNavbar