const AppointmentInfo = (appointment) => {

    const styles = {
        width: '300px',
        border: '1px solid black',
    };
    return(
        <div style={styles}>
            <p> {appointment.doctorName} </p>
            <p> {appointment.time} </p>
            <p> {appointment.date} </p>
        </div> 
    )
}

export default AppointmentInfo