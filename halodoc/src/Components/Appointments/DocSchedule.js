import React, {useState, useEffect} from 'react';
import axios from 'axios';
import patients from '../../database/patients.json';
import '../../Styles/Styles.DocSchedule.scss'
import DoctorNavbar from '../DoctorNavbar';
import { useNavigate } from 'react-router-dom';
// Since we have more data about the opening hours and closing hours and interval for each appointment,
// this function is just to create an array of all the available time slots.
// For example: 9:00 to 12:00 with interval 30 minutes:
// This function will return an array like: ["9:00", "10:00", "11:00", "12:00"]  
function createTimeArray(startTime, endTime, interval) {
    const timeArray = [];
  
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime?.split(":").map(Number);
  
    let hour = startHour;
    let minute = startMinute;
  
    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      timeArray.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
  
      minute += interval;
      hour += Math.floor(minute / 60);
      minute %= 60;
    }
  
    return timeArray;
  }

  //this function takes in a patientID and return the patient's name

// This function takes in 2 dates format mm/dd/yyyy and compare if they are the same dates
const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 === date2)
        return true
    return false
};


//const docInfoToSchedule

const DocSchedule = () => {
    const navigate = useNavigate();
    const [backendData, setBackendData] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/docschedule`)
        .then(({data}) => {
            setBackendData(data)
            setLoading(false)
            
          
        })
        .catch((err) => {   
            setLoading(false);
        });
    }, [])

    var startTime = "9:00"
    var endTime = "17:00"
    var interval = 30
    var dayOff = [1,2]
    var doctor = {}
    var doctorSchedule = [];
    
    
   /*Whereever you need to use the data from the backend, you should use the following code
   to block reading from null while the data is being loaded from the backend.*/

    if(!loading)
    {
        doctor = backendData.currentDoctor;
        startTime = doctor.startTime;
        endTime = doctor.endTime;
        interval = doctor.appointmentInterval;
        dayOff = doctor.dayOffs;
        doctorSchedule = backendData.doctorSchedule;
       
    }
    

    // When the page renders, get /schedule/:id from server.js and set the backend data.
    // get /schdule/:id response: {data: patient, doctorSchedule: doctorSchedule}
    // to get patient info: e.g. backendData.data.firstName
    // to get doctor schedule info: e.g  backendData.doctorSchedule[0].date 
     // Make sure to have [] here to avoid being render infinitely.


    const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
    const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    const hours = createTimeArray(startTime, endTime, interval);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date(new Date().toLocaleDateString()));


    //Go through each time slot in the date and compare with the data in doctor/{id}.json
    //and check if there is an apointment at that time slot
    const getPatientName = (patientID) => {
        const patient = patients.find((patient) => patient.id === patientID);
        if(patient != null){
            return `${patient.firstName} ${patient.lastName}`;
    
        }
        return ""
        
    }
    
    
    

    const selectedTimeSlot = (date) => {
        let tempHours = createTimeArray(startTime, endTime, interval);
        
        for (let i = 0; i < dayOff.length; i++){
            if (date.getDay() === dayOff[i])
                return []
        }
            if(doctorSchedule != null){
                for (let i = 0; i < doctorSchedule.length; i++){
                    if (compareDates(date, doctorSchedule[i].date)){
                        if (hours.includes(doctorSchedule[i].startTime)) {
                            tempHours.splice(tempHours.indexOf(doctorSchedule[i].startTime), 1,
                            doctorSchedule[i].startTime + ' with ' + getPatientName(doctorSchedule[i].patient_id));
                        } 
                        else {
                            tempHours.push(doctorSchedule[i].startTime + ' with ' + getPatientName(doctorSchedule[i].patient_id));
                        }
                        
                    }
                }
            }


        return tempHours.sort();
    }

    const handleNextWeekClick = () => {
        setCurrentWeekStartDate(() => {
            const nextWeekStartDate = new Date(currentWeekStartDate.getFullYear(), currentWeekStartDate.getMonth(), currentWeekStartDate.getDate() + 7);
            return nextWeekStartDate;
        })
    }

    const handleLastWeekClick = () => {
        setCurrentWeekStartDate(() => {
            let lastWeekStartDate;
            if (currentWeekStartDate > new Date())
                lastWeekStartDate = new Date(currentWeekStartDate.getFullYear(), currentWeekStartDate.getMonth(), currentWeekStartDate.getDate() - 7);
            else
                lastWeekStartDate = new Date(new Date().toLocaleDateString())
            
            return lastWeekStartDate;
        })
    }
    
    const handleThisWeekClick = () => {
        setCurrentWeekStartDate(new Date(new Date().toLocaleDateString()));
    }
    
    const generateWeeklyDates = () => {
        const dates = [];
        let currentDateIterator = currentWeekStartDate;
        for (let i = 0; i < 7; i++) {
        dates.push(currentDateIterator);
        currentDateIterator = new Date(currentDateIterator.getFullYear(), currentDateIterator.getMonth(), currentDateIterator.getDate() + 1);
        }
        return dates;
    }
    const weeklyDates = generateWeeklyDates();

    return (
        <div className='DocSchedule'>
            {loading ? (
                <div className='loading'>
                  <h2 className='loading-text'> Loading </h2>
                  <img src={require("../../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
                <div>
                    <DoctorNavbar name= {doctor.firstName + doctor.lastName} />
                    <div className='container'>
                        <div className='title'>
                            <h1> {doctor.firstName} {doctor.lastName}'s schedule  </h1>
                            <h2> {months[currentWeekStartDate.getMonth()]} {currentWeekStartDate.getFullYear()} </h2>
                        </div>
                        <div className='next-prev-buttons'>
                            <button onClick={handleThisWeekClick}> Back to this week </button>      
                            <button onClick={handleLastWeekClick}> prev </button>
                            <button onClick={handleNextWeekClick}> next </button>
                        </div>

                        <div className='generateHours'>
                            <div className='container'>
                                <div className='row'>
                                    
                                    {weeklyDates.map(date => (
                                        <div className='col'>
                                            <div className='date-title'>
                                                <div>{days[date.getDay()]} {date.getMonth()+1}/{date.getDate()}</div>
                                            </div>
                                            <div className='scheduleHours'>
                                                {selectedTimeSlot(date).map(hour => ( 
                                                    <div key={hour}>
                                                        
                                                        {hour.length > 5 ? (
                                                                
                                                                <a onClick={() => {navigate(`/makeappointmentbydoctor/${date}/${hour}`)}}  className="timeLink"> 
                                                                    <div className='hour occupied'> {hour}</div>
                                                                </a>
                                                            
                                                            ):(
                                                                <a onClick={() => {navigate(`/makeappointmentbydoctor/${date}/${hour}`)}}  className="timeLink"> 
                                                                    <div className='hour'> {hour}</div>
                                                                </a>
                                                            )}
                                                    </div>
                                                ))} 
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    
        </div>
        
    )
}


export default DocSchedule
