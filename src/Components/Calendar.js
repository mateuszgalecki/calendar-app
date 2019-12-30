import React from 'react';
import './calendar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';


function Calendar(props) {

    console.log(props.user);

    if (props.user === '') {
        return(
            <div className={'fullScreen primaryView'}>
                <div className={'loading'}> LOADING </div>
            </div>
        )
    } else {
        return(
        <section className='Calendar fullScreen primaryView'>
            <h1>RESTAURANT CALENDAR</h1>
            <p>Welcome to our restaurant calendar, XXXXXX. Here are some rules for how to use it:</p>
            <p>You can make a reservation for 20 people tops. If you want to make a bigger one, please call us at +48 888 888 888.</p>
            <p>Click on the day that You want to make the reservation on. Fill out the form and choose Your spot in the restaurant. To specify the menu You'd like to order, please call us.</p>
            <p>We'll make everything to make Your visit at our restaurant pleasurable!</p>
            <p>Cheers,</p>
            <p>RESTAURANT'S crew.</p>
            <button className={'goToCurrentMonthBtn'}>go to the current month</button>
        </section>
        )
    }
}


export default Calendar;