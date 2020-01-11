import React from 'react';
import './month.scss';
import { getDate } from 'date-fns';
import Restaurant from './Restaurant';

function Day(props) {

    const data = props.data;
    let reservations = [];
    if (data[1].length > 0) {
        data[1].forEach(res => {
            reservations.push(res);
        })
    }
    let resNumber = reservations.length;

    let date = getDate(data[0]);
    let activeClass = 'activeDay';
    console.log(data[0])

    if (!(date > 0)) {
        date = '';
        activeClass = 'passiveDay'
    }


    return(
        <div onClick={props.viewDay(data[0])} className={'Day ' + activeClass}>
            DAY:{date} R:{resNumber}
        </div>
    )   
}

export default Day;