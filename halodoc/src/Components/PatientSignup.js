import React, {useState, useEffect} from 'react';
import '../Styles/Styles.PatientSignup.scss'
const PatientSignup = () => {
    // const [backendData, setBackendData] = useState({})
    // useEffect(() => {
    // fetch("/api").then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     setBackendData(data)
    //   }
    // )
    // }, [])

    return(
        // <div>
        //     {(typeof backendData.msg === 'undefined') ? (
        //         <p>Loading....</p>  
        //     ) : (
        //         <p> {backendData.msg} </p>
        //     )}
        // </div>
        <div className='patientsignup'>
          <header>
            <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
          </header>

          <body>
            <section>
              <div className="signUp">
                <h1 > Patient-signup</h1>
                <label for="fname">First name:</label><br/>
                <input type="text" id="fname" name="fname" placeholder="your first name"/><br/>
                <label for="lname">Last name:</label><br/>
                <input type="text" id="lname" name="lname" placeholder="your last name"/><br/>
                <label for="email">Email:</label><br/>
                <input type="email" id="email" name="email" placeholder="email account"/><br/>
                <label for="number">Phone Number:</label><br/>
                <input type="text" id="number" name="number" placeholder="Phone Number"/><br/>
                <label for="Bdate">Birthday:</label><br/>
                <input type="date" id="Bdate" name="Bdate" placeholder="Birthdate:"/><br/>
                <label for="gender">Gender</label><br/>
                <select id="gender" name="gender" placeholder="your gender">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <br/>
                <br/>
                <button> Submit </button>
              </div>
            </section>

            <section>
              <div class ="text1">
              <h1>Provide strightforwad,fast medical appointment service</h1>
              <br/><br/>
              <h2>Save your Time and checky your appointment calendar Conveniently </h2> <br/>
              <img src={require("../Styles/img/doctor_online_3.jpg")} alt="" width="300px" height="250px" className="image"/>
              
              </div>
            </section>     

          </body>


        </div>

    )
}

export default PatientSignup