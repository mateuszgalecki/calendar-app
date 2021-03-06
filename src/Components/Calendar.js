import React from 'react';
import './calendar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
import Month from './Month';
import { startOfYear, formatISO, parse, addDays, getDate, getMonth, getDay, startOfMonth, addMonths, getDaysInMonth, parseISO } from 'date-fns';



function Calendar(props) {

    const dispatch = useDispatch();
    let user = useSelector(state => state.user);
    let reservations = useSelector(state => state.reservations).reservations;
    let activeMonthState = useSelector(state => state.date).activeMonth;
    let currentDate = useSelector(state => state.date).currentDate;
    const setActiveMonthAction = actionsFunction().dateActions.setActiveMonth;
    const setCurrentDateAction = actionsFunction().dateActions.setCurrentDate;
    const monthAction = actionsFunction().screenActions.month;

    //SETTING AN ACTIVE MONTH FOR THE FIRST TIME
    if (currentDate === '') {
        let activeMonth = formatISO(new Date());        
        dispatch(setCurrentDateAction(activeMonth));
        dispatch(setActiveMonthAction(getMonth(new Date())));
    }



    //MAKING A RESERVATIONS-CALENDAR ARRAY

    let parsedCurrentDate = parseISO(currentDate);
    let firstMonth = startOfYear(parsedCurrentDate);
    let RESERVATIONS_CALENDAR_ARRAY = [];
    
    
    for (let i = 0; i < 12; i++) {

        let singleMonthArray = [];
        let begginingOfMonth = startOfMonth(firstMonth);
        let monthLength = getDaysInMonth(firstMonth);
        for (let i = 0; i < monthLength; i++) {
            singleMonthArray.push([begginingOfMonth, []]);
            begginingOfMonth = addDays(begginingOfMonth, 1);
        }

        
        
        if (singleMonthArray[0] !== undefined) {
            let firstDay = getDay(singleMonthArray[0][0]);
            let daysToAddAtBeginning = 0;
            if (firstDay === 0) {
                daysToAddAtBeginning = 6;
            } else {
                daysToAddAtBeginning = firstDay - 1;
            }
            singleMonthArray.unshift([[daysToAddAtBeginning], []]);
            

            let lastDay = getDay(singleMonthArray[singleMonthArray.length - 1][0]);
            let daysToAddAtEnd = 0;
            if (lastDay === 0) {
                daysToAddAtEnd = 0;
            } else {
                daysToAddAtEnd = 7 - lastDay
            }
            singleMonthArray.push([[daysToAddAtEnd], []]);
        }
        
        


        RESERVATIONS_CALENDAR_ARRAY.push(singleMonthArray);
        firstMonth = addMonths(firstMonth, 1);
    }


    if (reservations.length !== 0) {
        reservations.forEach(res => {
            const resDate = parse(res.date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
            const day = getDate(resDate);
            const month = getMonth(resDate);
            if (RESERVATIONS_CALENDAR_ARRAY[month][day] !== undefined) {
                RESERVATIONS_CALENDAR_ARRAY[month][day][1].push(res);
            }
        })
        
    };

    const nextMonth = function() {
        let nextMnth = activeMonthState + 1;
        if (activeMonthState === 11) {
            // nextMnth = 0;
            alert('you can only make reservations for the current year');
        } else {
            dispatch(setActiveMonthAction(nextMnth));
        }
    }

    const prevMonth = function() {
        let prevMnth = activeMonthState - 1;
        let currentMonth = getMonth(new Date());
        if (activeMonthState === 0) {
            // prevMnth = 11;
            alert('you can only make reservations for the current year');
        } else if ( prevMnth < currentMonth ) {
            alert('you cannot make a reservation back in time!')
        } else {
            dispatch(setActiveMonthAction(prevMnth));
        }
    }
    

    let reservationsToPass = RESERVATIONS_CALENDAR_ARRAY[activeMonthState];


    if (user.email === "no_user") {
        return(
            <div className={'fullScreen primaryView'}>
                <div className={'loading'}> LOADING </div>
            </div>
        )
    } else if (props.screen === 'calendar_month') {
        return (
            <Month  deleteAReservation={props.deleteAReservation} addReservation={props.addReservation} logOut={props.logOut} prevMonthFunction={prevMonth} nextMonthFunction={nextMonth} month={activeMonthState} reservations={reservationsToPass}/>
        )
    } else {
        return(
        <section className='Calendar fullScreen primaryView'>
            <h1>RESTAURANT CALENDAR</h1>
            <p>Welcome to our restaurant calendar, {user.email}.</p>
            {/* <p>You can make a reservation for 20 people tops. If you want to make a bigger one, please call us at +48 888 888 888.</p> */}
            <p>Click on the day that You want to make the reservation on. Choose the tables You'd like to book and click the "add reservation button". To specify the menu You'd like to order, please call us.</p>
            <p>We'll make everything to make Your visit at our restaurant pleasurable!</p>
            <p>Cheers,</p>
            <p>RESTAURANT'S crew.</p>
            <button onClick={() => dispatch(monthAction())} className={'goToCurrentMonthBtn primary_button'}>go to the current month</button>
        </section>
        )
    }
}


export default Calendar;