import data from '../Database/Schedule.json';
import React, { useState } from 'react';
import './Backend-css/GenerateHour.css';

function WeeklyCalendar() {

  //convert the data into string
  const loadedData = JSON.stringify(data);
  //parses the string back into a JavaScript object using JSON.parse().
  const json = JSON.parse(loadedData);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const hours = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  //Initialize a state var called currentWeekStartDate to current time and data 
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());

  const selectedTimeSlot = (date) => {
    let tempHours = JSON.parse(JSON.stringify(hours));
    for (let i = 0; i < json.length; i++) {
      if (
        date.getDate() === json[i]['date'] &&
        date.getMonth() === json[i]['month'] &&
        date.getFullYear() === json[i]['year']
      ) {
        tempHours.splice(tempHours.indexOf(json[i]['startTime']), 1);
      }
    }
    return tempHours;
  };

  const handleNextWeekClick = () => {
    setCurrentWeekStartDate(() => {
      const nextWeekStartDate = new Date(
        currentWeekStartDate.getFullYear(),
        currentWeekStartDate.getMonth(),
        currentWeekStartDate.getDate() + 7
      );
      return nextWeekStartDate;
    });
  };

  const handleLastWeekClick = () => {
    setCurrentWeekStartDate(() => {
      let lastWeekStartDate;
      if (currentWeekStartDate > new Date())
        lastWeekStartDate = new Date(
          currentWeekStartDate.getFullYear(),
          currentWeekStartDate.getMonth(),
          currentWeekStartDate.getDate() - 7
        );
      else lastWeekStartDate = new Date();

      return lastWeekStartDate;
    });
  };

  const handleThisWeekClick = () => {
    setCurrentWeekStartDate(new Date());
  };

  const generateWeeklyDates = () => {
    const dates = [];
    let currentDateIterator = currentWeekStartDate;
    for (let i = 0; i < 7; i++) {
      dates.push(currentDateIterator);
      currentDateIterator = new Date(
        currentDateIterator.getFullYear(),
        currentDateIterator.getMonth(),
        currentDateIterator.getDate() + 1
      );
    }
    return dates;
  };

  const weeklyDates = generateWeeklyDates();

  return (
    <div>
      <h1>
        {' '}
        {months[currentWeekStartDate.getMonth()]}{' '}
        {currentWeekStartDate.getFullYear()}{' '}
      </h1>

      <div style={{ textAlign: 'right' }}>
        <button onClick={handleThisWeekClick}> Back to this week </button>
        <button onClick={handleLastWeekClick}> prev </button>
        <button onClick={handleNextWeekClick}> next </button>
      </div>

      {weeklyDates.map((date) => (
        <td key={date}>
          <td>
            {days[date.getDay()]} {date.getMonth() + 1}/{date.getDate()}
          </td>

          {selectedTimeSlot(date).map((hour) => (
            <div>
              {new Date() < date && (
                <div>
                  <input
                    type='radio'
                    id=''
                    name='hours'
                    value=''
                    className='timeRadioInput'
                  />
                  <label>{hour}</label>
                </div>
              )}

              {new Date() >= date && (
                <div>
                  <input
                    type='radio'
                    id=''
                    name='hours'
                    value=''
                    className='timeRadioInput'
                    disabled
                  />
                  <label>{hour}</label>
                </div>
              )}
            </div>
          ))}
        </td>
      ))}
      
      <div style={{ textAlign: 'right' }}>
        <br />
        <button> CONTINUE </button>
      </div>
    </div>
  );
}

function ShowDoctorsHours() {
  return <WeeklyCalendar />;
}

export default ShowDoctorsHours;
