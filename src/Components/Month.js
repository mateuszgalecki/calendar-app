import React from 'react';
import Day from './Day';
import './month.scss';
import { formatISO, parse, getMonth, getYear, startOfMonth, addMonths } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';

function Month(props) {

    const dispatch = useDispatch();
    let activeMonthState = useSelector(state => state.date).activeMonth;
    let currentDate = useSelector(state => state.date).currentDate;
    const setActiveMonthAction = actionsFunction().dateActions.setActiveMonth;
    const setCurrentDateAction = actionsFunction().dateActions.setCurrentDate;

    let reservations = props.reservations.reservations;
    console.log(reservations);
    if (reservations.length !== 0) {
        console.log('not an empty array now');
        let datesArr = reservations.map((reservation) => {
        return parse(reservation.date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    });
    console.log(datesArr);
    };

    //SETTING AN ACTIVE MONTH FOR THE FIRST TIME
    if (currentDate === '') {
        let activeMonth = formatISO(new Date());        
        dispatch(setCurrentDateAction(activeMonth));
    }

    //MAKING A RESERVATIONS-CALENDAR OBJECT
    // let currentMonth = getYear(new Date()).toString() + ', ' + getMonth(new Date()).toString();
    // console.log(currentMonth);
    // let nextMonth = addMonths(currentMonth, 1);
    // console.log(nextMonth);
    // nextMonth = addMonths(currentMonth, 1);
    // console.log(nextMonth);
    // let yearArray = [];
    // for (let i = 0; i < 12; i++) {
        
    // }
    // const dynamicArray = ["2007", "2008", "2009", "2010"];
    // const obj = Object.fromEntries(
    //  dynamicArray.map(year => [year, {
    //    something: "based",
    //    on: year
    //  }])
    // )

    // console.log(obj);
    
    
    let monthArray = [];
    


    return(
        <section className='Month'>
            hello, month!
        </section>
    )
}


export default Month;