import DoctorNavbar from "./DoctorNavbar"
const AddPatient = () => {
    return(

        <div>
            <DoctorNavbar/>
            <div className="container">
                <label> New patient first name </label>
                <input type='text'/>
                <label> New patient last name </label>
                <input type='text'/>
                
            </div>
        </div>
    )
}

export default AddPatient