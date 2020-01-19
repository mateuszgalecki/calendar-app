import React from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';

const Restaurant = function(props) {

    const dispatch = useDispatch();
    let lowerValue = useSelector(state => state.restaurant).hourSpan[0];
    let upperValue = useSelector(state => state.restaurant).hourSpan[1];
    const lowerAction = actionsFunction().restaurantActions.setLowerValue;
    const upperAction = actionsFunction().restaurantActions.setUpperValue;
    const setTablesArray = actionsFunction().restaurantActions.setTablesArray;

    let tablesArray = useSelector(state => state.restaurant).tablesArray;
    let newTablesArray = [[], [], [], [], [], [], [], [], [], []];

    if (props.data[0] !== undefined) {
        props.data.forEach(reservation => {
            let startHour = reservation.date.slice(11, 16)
            reservation.info.spots.forEach(table => {
                newTablesArray[table - 1].push([startHour, reservation.info.duration])
            })
        })
        // dispatch(setTablesArray(newTablesArray));
    }

    // nie działa kurwe, robi się pętla, do ogarnięcia

    // console.log(newTablesArray);
    
    let day = new Date(props.day);
    let headerString = format(day, 'EEEE, do LLLL yyyy');

    //Time convert functions for inputs values handling

    function time_convert(num){ 
        let hours = Math.floor(num / 60); 
        let minutes = num % 60;
        if (minutes == 0) {
            minutes = '00';
        }
        if (hours.toString().length === 1) {
            hours = '0' + hours.toString();
        }
        return hours + ":" + minutes;         
    }

    function time_convert_back(str) {
        let hours = Number(str.slice(0, 2));
        let halfHours = Number(str.slice(3, 5));
        return hours * 60 + halfHours;
    }

    //Handling inputs

    const handleLowerChange = function(event) {
        dispatch(lowerAction(event.target.value));
        let lowerHours = time_convert_back(event.target.value);
        let upperHours = time_convert_back(upperValue);
        if (upperHours - lowerHours < 120) {
            dispatch(lowerAction(time_convert(upperHours - 120)))
        }
        event.target.blur();
    }

    const handleUpperChange = function(event) {
        dispatch(upperAction(event.target.value));
        let lowerHours = time_convert_back(lowerValue);
        let upperHours = time_convert_back(event.target.value);
        if (upperHours - lowerHours < 120) {
            dispatch(upperAction(time_convert(lowerHours + 120)))
        }
        event.target.blur();
    }

    const handleFocus = function(event) {
        event.target.value = '';
    }

    //Making a list of hours for hour inputs

    let hoursArray = [];

    for (let i = 480; i <= 1320; i = i + 30) {
        hoursArray.push(time_convert(i));
    }

    //A function to make a range array with a certain step value
    const xah_range = ((min, max, step = 1) => (Array(Math.floor((max - min)/step) + 1) . fill(min) . map ( ((x, i) => ( x + i * step )) )));



    return(
        <section className='center primaryView fullScreen'>
            <p>{headerString}</p>
            {/* <span className="multi-range">
                <input onChange={handleLowerChange} value={lowerValue} type="range" min="8" max="22" id="lower"/>
                <input onChange={handleUpperChange} value={upperValue} type="range" min="8" max="22" id="upper"/>
            </span> */}
            <input type='text' list='hours' value={lowerValue} onFocus={handleFocus} onChange={handleLowerChange}/>
            <input type='text' list='hours' value={upperValue} onFocus={handleFocus} onChange={handleUpperChange}/>
            <datalist id='hours'>
                {hoursArray.map((hour, key) => {
                    return <option key={key} value={hour}/>
                })}
            </datalist>
            
            <div className='Restaurant'>
                {/* <div className='table table1'>1</div>
                <div className='table table2'>2</div>
                <div className='table table3'>3</div>
                <div className='table table4'>4</div>
                <div className='table table5'>5</div>
                <div className='table table6'>6</div>
                <div className='table table7'>7</div>
                <div className='table table8'>8</div>
                <div className='table table9'>9</div>
                <div className='table table10'>10</div> */}
                {newTablesArray.map((resArr, key) => {
                    let tableNumberClass = 'table' + (key + 1);
                    let upperValueInMinutes = time_convert_back(upperValue)
                    let lowerValueInMinutes = time_convert_back(lowerValue)
                    let currentSpanArray = xah_range(lowerValueInMinutes, upperValueInMinutes, 30);
                    let isTheTableTaken = false;
                    resArr.forEach(res => {
                        console.log(res[0], res[1])
                        let startHour = time_convert_back(res[0]) + 30;
                        let finnishHour = startHour + res[1] * 60 - 30;
                        let reservationSpan = xah_range(startHour, finnishHour, 30);
                        reservationSpan.forEach(hour => {
                            if (currentSpanArray.includes(hour)) {
                                isTheTableTaken = true;
                            }
                        })
                    })
                    let tableTaken = '';
                    if (isTheTableTaken) {
                        tableTaken = 'taken';
                    } else {
                        tableTaken = '';
                    }
                    return <div key={key} className={'table ' + tableNumberClass + ' ' + tableTaken}>{key + 1}</div>
                })}
            </div>
        </section>
    )
}

export default Restaurant;