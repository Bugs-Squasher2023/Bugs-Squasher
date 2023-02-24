import React from 'react';
import '../Styles/Styles.Introduction.scss'
import { Link } from 'react-router-dom'
const Introduction = () => {


    return(
        <div className='introduction'>
            <header>
                <div className="picture">
                    <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
                </div>
                <p className="provider"> Are you a  <button className="button3" > provider </button> ? </p> 
            </header>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div className ="text1">
                            <h1> Appointment with your doctors made easy!</h1>
                            <p className ="text3" style={{ color: 'darkcyan' }}> Skip calling and make appointments with your doctors just through a few clicks  </p>
                        </div>   
                    </td> 
                    <td>
                        <div className="picture2">
                            <img src={require("../Styles/img/cardiologist.jpg")} alt="" width="650px" height="500px" />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className = "text2">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to='/patientlogin'> 
                                    <button className="button button1"> Sign In</button>
                                </Link>
                            </td>
                            <td style={{paddingLeft: '50px' }} >
                                <Link to='/patientsignup'> 
                                    <button className="button button2">Sign up</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Introduction