import React from 'react';
import { parse, format } from 'date-fns';

const UsersReservation = function(props) {

    let tablesString = props.tables.map(table => {return ` ${table}`}).toString();
    const reservationDate = parse(props.date, "yyyy-MM-dd'T'HH:mm:ss", new Date())
    let today = format(reservationDate, "do ' of ' LLLL");

    // EEEE', the ' 
    // ' ' y

    const deleteThisReservation = function() {
        props.deleteAReservation(props.firestoreID);
    }

    return(
        <div className='users_reservation'>
            <div>
                <p>{today}</p>
                <p>Tables: {tablesString}</p>
            </div>
            <button onClick={deleteThisReservation}>X</button>
        </div>
    )
}

export default UsersReservation;