import '../../Styles/Styles.Upcoming.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const AppointmentInfo = (appointment) => {
    let navigate = useNavigate(); 

    const styles = {
        width: '300px',
        border: '1px solid black',
    };

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
        console.log('page to reload')
    }

    const handleCancel = async () => {
        try {
            const response = await axios.post('/cancelAppointment', appointment).then(
                refreshPage()
            )
        }
        catch (err) {
            console.error(err);
        }
    }

    return(
        <div className='information '>
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-4">
                        <img src={require("../../Styles/img/calendar_icon.png")} alt=""  />
                        
                        <div className="dropdown ">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Modify
                            </button>
                            
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <p onClick={handleCancel}> Cancel appointment</p>
                            </div>
                        </div>

                    </div>
                        
                    <div className="col-sm-8">
                        <div className='text1'>
                            <p>Doctor: {appointment.doctorName} </p>
                            <p>Specialty: {appointment.specialty} </p>
                            <p>Start time: {appointment.startTime} </p>
                            <p>Date: {appointment.date} </p>
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
        
    )
}

export default AppointmentInfo
