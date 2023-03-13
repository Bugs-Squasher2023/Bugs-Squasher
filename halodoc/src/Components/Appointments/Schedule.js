import React, {useState, useEffect} from 'react';
import doctorsJson from '../../database/doctors.json'
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from 'axios';
import Navbar from '../Navbar';
import scheduleJson from '../../database/schedules.json'
import '../../Styles/Styles.Schedule.scss'



// Since we have more data about the opening hours and closing hours and interval for each appointment,
// this function is just to create an array of all the available time slots.
// For example: 9:00 to 12:00 with interval 30 minutes:
// This function will return an array like: ["9:00", "10:00", "11:00", "12:00"]  
function createTimeArray(startTime, endTime, interval) {
    const timeArray = [];
  
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
  
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

// This function takes in 2 dates format mm/dd/yyyy and compare if they are the same dates
const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 === date2)
        return true
    return false
};

const Schedule = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    //Get the doctor database, his/her opening time, closing time, appointment intervals and day offs in the week.
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const doctor = doctors.find((doctor) => doctor.id === id)
    const startTime = doctor.startTime;
    const endTime = doctor.endTime;
    const interval = doctor.appointmentInterval;
    const dayOff = doctor.dayOffs;
    

    const [backendData, setBackendData] = useState({})
    const [pickTime, setPickTime] = useState("");
    const [pickDate, setPickDate] = useState("");

    // When the page renders, get /schedule/:id from server.js and set the backend data.
    // get /schdule/:id response: {data: patient, doctorSchedule: doctorSchedule}
    // to get patient info: e.g. backendData.data.firstName
    // to get doctor schedule info: e.g  backendData.doctorSchedule[0].date 
    useEffect(() => {
        axios.get(`/schedule/${id}`)
        .then(({data}) => {
            setBackendData(data)
        })
    }, []) // Make sure to have [] here to avoid being render infinitely.


    const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
    const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    const hours = createTimeArray(startTime, endTime, interval);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());


    //Go through each time slot in the date and compare with the data in doctor/{id}.json
    //and check if there is an apointment at that time slot

    const selectedTimeSlot = (date) => {
        
        for (let i = 0; i < dayOff.length; i++){
            if (date.getDay() === dayOff[i])
                return []
        }
        
        const tempHours = [...hours];
        for (let i = 0; i < backendData.doctorSchedule.length; i++){
            if (compareDates(date, backendData.doctorSchedule[i].date)){
                tempHours.splice(tempHours.indexOf(backendData.doctorSchedule[i].startTime), 1)
                // tempHours.splice(tempHours.indexOf(backendData.doctorSchedule[i].startTime), 1, 
                // "patientID" + backendData.doctorSchedule[i].patient_id)
                    
            }
        }
        return tempHours
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
                lastWeekStartDate = new Date()
            
            return lastWeekStartDate;
        })
    }
    
    const handleThisWeekClick = () => {
        setCurrentWeekStartDate(new Date());
    }

    const handleSubmit = async () => {
        let submitData;
        if(pickTime && pickDate) {
            submitData = {
                "doctor_id": id,
                "patient_id": backendData.data.id,
                "startTime": pickTime,
                "date": pickDate            
            };
        }
        if(submitData) {
            console.log(submitData);
            try {
                const response = await axios.post('/makeappointment', submitData);
                console.log(response.data);
                navigate(response.data.data);
                if(response.status === 200) {
                  console.log('successful');
                } else {
                  console.log("Error Make Appointment");
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    };
    
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
        <div className='PatientSchedule'>
            
            {(typeof backendData.data === 'undefined') ? (
            <div style={{textAlign: "center"}}>
              
              <h2> Loading </h2> <br/>
            </div>
            ):(
                <div>
                    <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender}/>                    
                    <div className='container'>
                    <div className='title'>
                        <h2> Patient {backendData.data.firstName} making appointment with doctor {doctor.firstName} </h2>
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
                                                <div onChange={(e) => {setPickTime(e.target.value); setPickDate((date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear())}}>
                                                
                                                <div key={hour}>
                                                    <input type="radio" className="btn-check" name="my-radio" id={hour+(new Date(date))} value={hour}/>
                                                    <label className="btn btn-outline-info" for={hour+(new Date(date))}> {hour} </label>
                                                </div>
                                                </div>
                                            ))} 
                                        </div>
                                    </div>
                                ))}

                                
                            </div>
                            
                        </div>
                        <button onClick={handleSubmit} className='btn btn-success submitbtn'> SUBMIT </button>
                    </div>
                </div>
            </div>
            
            )}
        </div>
    )
}

export default Schedule