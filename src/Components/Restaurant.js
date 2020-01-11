import React from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';

const Restaurant = function(props) {

    const dispatch = useDispatch();
    let lowerValue = Number(useSelector(state => state.restaurant).hourSpan[0]);
    let upperValue = Number(useSelector(state => state.restaurant).hourSpan[1]);
    const lowerAction = actionsFunction().restaurantActions.setLowerValue;
    const upperAction = actionsFunction().restaurantActions.setUpperValue;

    console.log(props.data);
    let tablesArray = [];
    let day = new Date(props.day);
    console.log(day);
    let headerString = format(day, 'EEEE, do LLLL yyyy');


    const handleLowerChange = function(event) {
        dispatch(lowerAction(event.target.value));
        // DO DOROBIENIA WARUNKI PRZESUWACZY 
        if (Math.abs(upperValue - lowerValue) < 3) {
            if (upperValue == 22) {
                dispatch(lowerAction(19));
            } else {
                dispatch(upperAction(lowerValue + 3));
            }
        }
    }

    const handleUpperChange = function(event) {
        dispatch(upperAction(event.target.value));
        // DO DOROBIENIA WARUNKI PRZESUWACZY 
        if (Math.abs(upperValue - lowerValue) < 3) {
            if (lowerValue == 8) {
                dispatch(upperAction(11));
            } else {
                dispatch(lowerAction(upperValue - 3));
            }
        }
    }

    return(
        <section className='center primaryView fullScreen'>
            <p>{headerString}</p>
            <span className="multi-range">
                <input onChange={handleLowerChange} value={lowerValue} type="range" min="8" max="22" id="lower"/>
                <input onChange={handleUpperChange} value={upperValue} type="range" min="8" max="22" id="upper"/>
            </span>
            <div className='Restaurant'>
                <div className='table table1'>1</div>
                <div className='table table2'>2</div>
                <div className='table table3'>3</div>
                <div className='table table4'>4</div>
                <div className='table table5'>5</div>
                <div className='table table6'>6</div>
                <div className='table table7'>7</div>
                <div className='table table8'>8</div>
                <div className='table table9'>9</div>
                <div className='table table10'>10</div>
            </div>
        </section>
    )
}

export default Restaurant;