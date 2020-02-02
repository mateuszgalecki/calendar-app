import React from 'react';
import './addAReservation.scss';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';

const AddReservationScreen = function(props) {

    const dispatch = useDispatch();
    const setNameAction = actionsFunction().restaurantActions.setResName;
    const setPhoneAction = actionsFunction().restaurantActions.setResPhone;
    let resName = useSelector(state => state.restaurant).resName;
    let resPhone = useSelector(state => state.restaurant).resPhone;

    const weekDays = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = format(props.day, "EEEE ', the ' do ' of ' LLLL ' ' y");

    console.log(props.selectedTables, props.selectedHourSpan, props.day);

    

    const nameBlur = function(event) {

        let letters = /^[A-Za-z]+$/;

        let userName = event.target.value;
        if (!userName.match(letters)) {
            event.target.value = '';
            alert('for the name, please use letters only');
        }
    }

    const phoneBlur = function(event) {

        let numbers = /^[+-]?\d+$/;

        let userName = event.target.value;
        if (!userName.match(numbers)) {
            event.target.value = '';
            alert('for the phone number, please use numbers and plus sign only');
        }
    }

    const nameChange = function(event) {
        dispatch(setNameAction(event.target.value));
    }

    const phoneChange = function(event) {
        dispatch(setPhoneAction(event.target.value));
    }
    
    return(
        <section className={'temporaryPin fullScreen primaryView ' + props.showClass}>
            <p>Hello, You're making a reservation for {today}. Keep in mind, that the reservation should last minimum two hours. The restaurant is opened from 8:00 untill 22:00, therefore Your reservation musn't start later that 20:00. </p>
            <p>Your Name:</p>
            <input onChange={nameChange} value={resName} onBlur={nameBlur} type='text'></input>
            <p>Your telephone number:</p>
            <input onChange={phoneChange} value={resPhone} onBlur={phoneBlur} type='tel'></input>
            <button onClick={() => props.addReservation(props.day, props.selectedHourSpan, props.selectedTables, resName, resPhone)}>add a reservation</button>
            <button onClick={props.goBack}>back</button>
        </section>
    )
}

export default AddReservationScreen;