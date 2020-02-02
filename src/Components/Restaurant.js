import React from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
import AddReservationScreen from './AddReservationScreen';

const Restaurant = function(props) {

    const dispatch = useDispatch();
    let lowerValue = useSelector(state => state.restaurant).hourSpan[0];
    let upperValue = useSelector(state => state.restaurant).hourSpan[1];
    let bookingScreen = useSelector(state => state.restaurant).bookingScreen;
    const lowerAction = actionsFunction().restaurantActions.setLowerValue;
    const upperAction = actionsFunction().restaurantActions.setUpperValue;
    const setViewDayAction = actionsFunction().viewDayActions.setViewDay;
    const setTable = actionsFunction().restaurantActions.setTable;
    const switchBookingScreen = actionsFunction().restaurantActions.switchBookingScreen;
    const setTableAsFalse = actionsFunction().restaurantActions.setTableAsFalse;

    let tablesArray = useSelector(state => state.restaurant).tablesArray;
    let newTablesArray = [[], [], [], [], [], [], [], [], [], []];

    if (props.data[0] !== undefined) {
        props.data.forEach(reservation => {
            let startHour = reservation.date.slice(11, 16)
            reservation.info.spots.forEach(table => {
                newTablesArray[table - 1].push([startHour, reservation.info.duration])
            })
        })
    }

    //A function to make a range array with a certain step value
    const xah_range = ((min, max, step = 1) => (Array(Math.floor((max - min)/step) + 1) . fill(min) . map ( ((x, i) => ( x + i * step )) )));
    
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

    

    //Back to month function

    const backToMonth = function() {
        dispatch(setViewDayAction('hide'));
    }

    //Tables selection fns

    const selectTheTable = function(key) {
        dispatch(setTable(key));
    }

    const cannotSelect = function() {
        console.log('taken');
    }

    //Go to booking screen fn

    const goToBookingScreen = function() {
        dispatch(switchBookingScreen());
    }

    return(
        <section className='center primaryView fullScreen'>
            <AddReservationScreen addReservation={props.addReservation} selectedTables={tablesArray} selectedHourSpan={[lowerValue, (time_convert_back(upperValue) - time_convert_back(lowerValue)) / 60]} goBack={goToBookingScreen} showClass={bookingScreen ? '' : 'hideMe'} day={day}/>
            <p>{headerString}</p><br/>
            <p>Choose the hour, select the tables that You want to book and click "add a reservation" button.</p><br/>
            <input type='text' list='hours' value={lowerValue} onFocus={handleFocus} onChange={handleLowerChange}/>
            <input type='text' list='hours' value={upperValue} onFocus={handleFocus} onChange={handleUpperChange}/>
            <datalist id='hours'>
                {hoursArray.map((hour, key) => {
                    return <option key={key} value={hour}/>
                })}
            </datalist>
            <div className='Restaurant'>
                {newTablesArray.map((resArr, key) => {
                    let tableNumberClass = 'table' + (key + 1);
                    let upperValueInMinutes = time_convert_back(upperValue)
                    let lowerValueInMinutes = time_convert_back(lowerValue)
                    let currentSpanArray = xah_range(lowerValueInMinutes, upperValueInMinutes, 30);
                    let isTheTableTaken = false;
                    resArr.forEach(res => {
                        console.log(res[0], res[1])
                        let startHour = time_convert_back(res[0]) + 30;
                        let finnishHour = startHour + res[1] * 60 - 60;
                        console.log(finnishHour);
                        let reservationSpan = xah_range(startHour, finnishHour, 30);
                        reservationSpan.forEach(hour => {
                            if (currentSpanArray.includes(hour)) {
                                isTheTableTaken = true;
                            }
                        })
                    })
                    let tableTaken = '';
                    let tableSelected = '';
                    if (!isTheTableTaken) {
                        tablesArray[key] ? tableSelected = 'selected' : tableSelected = '';
                        tableTaken = '';
                    } else {
                        tableTaken = 'taken';
                        dispatch(setTableAsFalse(key));
                    }
                    return <div onClick={isTheTableTaken ? cannotSelect : () => selectTheTable(key)} key={key} className={'table ' + tableNumberClass + ' ' + tableTaken + '' + tableSelected}>{key + 1}</div>
                })}
            </div>
            <button onClick={backToMonth}>back</button>
            <button onClick={goToBookingScreen}>add a reservation</button>
        </section>
    )
}

export default Restaurant;