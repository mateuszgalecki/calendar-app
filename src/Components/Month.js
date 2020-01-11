import React from 'react';
import Day from './Day';
import './month.scss';
import { getDay, format, toDate } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
import Restaurant from './Restaurant';

function Month(props) {
    let reservationsArray = props.reservations;
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let thisMonth = props.month;
    const dispatch = useDispatch();
    let viewedDay = useSelector(state => state.viewDay).value;
    const setViewedDay = actionsFunction().viewDayActions.setViewDay;
   
    // const dynamicArray = ["2007", "2008", "2009", "2010"];
    // const obj = Object.fromEntries(
    //  dynamicArray.map(year => [year, {
    //    something: "based",
    //    on: year
    //  }])
    // )
    // console.log(obj);
    
    if (reservationsArray[0] !== undefined) {
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

    // if (typeof viewedDay == Object) {
    //     console.log('should pass data');
    //     reservationsArray.forEach(day => {
    //         if (day[0] === viewedDay) {
    //             dataForDayView = day[1];
    //         }
    //     })
    // }


    const viewDay = function(date) {
        dispatch(setViewedDay(date));
    }


    if (viewedDay === 'hide') {
        return(
        <section className='Month fullScreen primaryView'>
            <div className='month'>
                <div className='monthName'>
                    <button onClick={props.prevMonthFunction} className='prevMonthBtn'>prev</button>
                    {monthNames[thisMonth]}
                    <button onClick={props.nextMonthFunction} className='nextMonthBtn'>next</button>
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
        </section>
    )
    } else {
        let dataToPass = [];
        reservationsArray.forEach(day => {
            if (day[0].toString() === viewedDay) {
                dataToPass = day[1];
            }
        })

        return(
            <Restaurant day={viewedDay} data={dataToPass}/>
        )
    }
    
}


export default Month;