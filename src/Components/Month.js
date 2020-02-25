import React from 'react';
import Day from './Day';
import './month.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
import Restaurant from './Restaurant';
import YourReservations from './YourReservations';
import { compareAsc, subDays } from 'date-fns';

function Month(props) {
    let reservationsArray = props.reservations;
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let thisMonth = props.month;
    const dispatch = useDispatch();
    let viewedDay = useSelector(state => state.viewDay).value;
    const setViewedDay = actionsFunction().viewDayActions.setViewDay;

    
    if (reservationsArray[0] !== undefined && reservationsArray !== undefined) {
        if (reservationsArray[0][0][0] === 0) {
            reservationsArray.shift();
        } else {
            for (let i = reservationsArray[0][0][0] - 1; i > 0; i--) {
                reservationsArray.unshift([[], []]);
            }
        }
        if (reservationsArray[reservationsArray.length - 1][0][0] === 0) {
            reservationsArray.pop();
        } else {
            for (let i = reservationsArray[reservationsArray.length - 1][0][0]; i > 1; i--) {
                reservationsArray.push([[], []]);
            }
        }
    }


    const viewDay = function(date, dateToCheck) {
        let areYouMakingAReservationInThePast = compareAsc(dateToCheck, subDays(new Date(), 1));
        if (areYouMakingAReservationInThePast < 0) {
            alert("dont't make the reservation in the past");
        } else {
            dispatch(setViewedDay(date));
        }

    }

    const viewYourReservations = function() {
        dispatch(setViewedDay('yourReservations'));
    }

    const logOut = function() {
        props.logOut();
    }


    if (viewedDay === 'hide') {
        return(
        <section className='Month fullScreen primaryView'>
            <div className='month'>
                <div className='monthName'>
                    <button onClick={props.prevMonthFunction} className='changeMonthBtn prevMonthBtn'>prev</button>
                    {monthNames[thisMonth]}
                    <button onClick={props.nextMonthFunction} className='changeMonthBtn nextMonthBtn'>next</button>
                </div>
                <div className='monthHeader'>
                    <div className='dayName'>MON</div>
                    <div className='dayName'>TU</div>
                    <div className='dayName'>WED</div>
                    <div className='dayName'>THU</div>
                    <div className='dayName'>FR</div>
                    <div className='dayName'>SAT</div>
                    <div className='dayName'>SUN</div>
                </div>
                {
                    reservationsArray.map((day, index) => {
                        return <Day key={index} viewDay={viewDay} data={day}/>
                    })
                }
            </div>
            <button className='back_button' onClick={logOut}>log out</button>
            <button className='add_res_button' onClick={viewYourReservations}>go to Your reservations</button>
        </section>
    )
    } else if (viewedDay === 'yourReservations') {
        return(
            <YourReservations deleteAReservation={props.deleteAReservation}/>
        )
    } else {
        let dataToPass = [];
        reservationsArray.forEach(day => {
            if (day[0].toString() === viewedDay) {
                dataToPass = day[1];
            }
        })

        return(
            <Restaurant addReservation={props.addReservation} day={viewedDay} data={dataToPass}/>
        )
    }
    
}


export default Month;