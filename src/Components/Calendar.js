import React from 'react';
import './calendar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
import Month from './Month';


function Calendar(props) {

    const dispatch = useDispatch();
    let user = useSelector(state => state.user).email;
    let reservations = useSelector(state => state.reservations);
    let monthAction = actionsFunction().screenActions.month;
    console.log(reservations);

    if (user.email === '') {
        return(
            <div className={'fullScreen primaryView'}>
                <div className={'loading'}> LOADING </div>
            </div>
        )
    } else if (props.screen === 'calendar_month') {
        return (
            <Month reservations={reservations}/>
        )
    } else {
        return(
        <section className='Calendar fullScreen primaryView'>
            <h1>RESTAURANT CALENDAR</h1>
            <p>Welcome to our restaurant calendar, {user}. Here are some rules for how to use it:</p>
            <p>You can make a reservation for 20 people tops. If you want to make a bigger one, please call us at +48 888 888 888.</p>
            <p>Click on the day that You want to make the reservation on. Fill out the form and choose Your spot in the restaurant. To specify the menu You'd like to order, please call us.</p>
            <p>We'll make everything to make Your visit at our restaurant pleasurable!</p>
            <p>Cheers,</p>
            <p>RESTAURANT'S crew.</p>
            <button onClick={() => dispatch(monthAction())} className={'goToCurrentMonthBtn'}>go to the current month</button>
        </section>
        )
    }
}


export default Calendar;