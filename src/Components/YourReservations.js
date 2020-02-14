import React from 'react';
import { useDispatch } from 'react-redux';
import { actionsFunction } from '../index';

const YourReservations = function() {

    const dispatch = useDispatch();
    const setViewDayAction = actionsFunction().viewDayActions.setViewDay;

    const backToMonth = function() {
        dispatch(setViewDayAction('hide'));
    }

    return(
        <section className='primaryView fullScreen'>
            <p>my reservations:</p>
            <button onClick={backToMonth}>back</button>
        </section>
    )
}

export default YourReservations;