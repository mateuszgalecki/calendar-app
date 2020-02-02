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

    console.log(data)
    
    if (!(date > 0)) {
        date = '';
        activeClass = 'passiveDay'
    }

    // console.log(data[0].toString())
    let dateString = data[0].toString();

    console.log(data[0]);

    const doTheFuckingThing = function() {
        // console.log('sdfdf');
        props.viewDay(dateString);
    }

    return(
        <div onClick={() => {if (activeClass === 'activeDay') {
            doTheFuckingThing()
        }}}
         className={'Day ' + activeClass}>
            {date} <br/> R:{resNumber}
        </div>
    )   
}

export default Day;