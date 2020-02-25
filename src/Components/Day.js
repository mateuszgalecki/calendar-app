import React from 'react';
import './month.scss';
import { getDate } from 'date-fns';

function Day(props) {

    const data = props.data;
    let reservations = [];
    
    if (data[1].length > 0) {
        data[1].forEach(res => {
            reservations.push(res);
        })
    }

    let date = getDate(data[0]);
    let activeClass = 'activeDay';
    
    if (!(date > 0)) {
        date = '';
        activeClass = 'passiveDay'
    }

    // console.log(data[0].toString())
    let dateString = data[0].toString();

    const doTheFuckingThing = function() {
        // console.log('sdfdf');
        props.viewDay(dateString, data[0]);
    }

    return(
        <div onClick={() => {if (activeClass === 'activeDay') {
            doTheFuckingThing()
        }}}
         className={'Day ' + activeClass}>
            {date}
        </div>
    )   
}

export default Day;