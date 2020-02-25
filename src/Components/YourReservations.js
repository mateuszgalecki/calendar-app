import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionsFunction } from '../index';
import UsersReservation from './UsersReservation';
import './yourReservations.scss';

const YourReservations = function(props) {

    const dispatch = useDispatch();
    const setViewDayAction = actionsFunction().viewDayActions.setViewDay;
    let yourReservations = useSelector(state => state.reservations).yourReservations;

    const backToMonth = function() {
        dispatch(setViewDayAction('hide'));
    }

    return(
        <section className='your_reservations primaryView fullScreen'>
            <p style={{
                position: 'fixed',
                top: '30px',
                left: '30px',
                fontSize: '1.6rem'
            }}>my reservations:</p>
            {yourReservations.map((reservation, index) => {
                return <UsersReservation deleteAReservation={props.deleteAReservation} key={index} firestoreID={reservation.firestoreID} date={reservation.date} tables={reservation.info.spots}/>
            })}
            <button className='back_button' onClick={backToMonth}>back</button>
        </section>
    )
}

export default YourReservations;