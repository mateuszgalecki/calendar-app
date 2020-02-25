import React from 'react';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Calendar from './Calendar';
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';



function ScreenRender(props) {

    let screen = useSelector(state => state.screen);
    const dispatch = useDispatch();
    const welcomeAction = actionsFunction().screenActions.welcome;
    const calendarAction = actionsFunction().screenActions.calendar;

    const goBack = function(event) {
        dispatch(welcomeAction());
        console.log('go back');
    }

    const showCalendar = () => {
        dispatch(calendarAction());
        console.log('hello, calendar');
    }

    if (screen.includes('calendar')) {
        return(
            <div>
                <Calendar deleteAReservation={props.deleteAReservation} addReservation={props.addReservation} logOut={props.logOut} screen={screen}/>
            </div>
        )
    } else {
        return(
        <div>
            {/* <Welcome/> */}
            <div>
                <LogIn showCalendar={showCalendar} goBack={goBack} showMe={screen} logIn={props.logIn}/>
                <CreateAccount showCalendar={showCalendar} goBack={goBack} showMe={screen} createANewAccount={props.createANewAccount}/>
            </div>
            <Welcome/>
        </div>
    )

    }
}

export default ScreenRender;