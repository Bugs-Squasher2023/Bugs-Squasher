import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Navbar = ({name, email}) => {
    let navigate = useNavigate(); 

    const handleLogout= async (e) => {
      
        e.preventDefault();
        console.log('Click logout')
        try {
          const response = await axios.post('/logout');
          console.log(response.data.data)
          navigate(response.data.data)
        } catch (err) {
          console.error(err);
        }
      };

    return(
        <div>
        
            <Link to='/dashboard'> 
                <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
            </Link>
            <p> {name} </p>
            <p> {email} </p>
            <button onClick={handleLogout}> Log out </button>
            
        </div>
    )
}

export default Navbar