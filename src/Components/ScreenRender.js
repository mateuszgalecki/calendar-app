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

    const logInAndShowCalendar = () => {
        dispatch(calendarAction());
        console.log('hello, calendar');
    }

    if (screen === 'calendar') {
        return(
            <div>
                <Calendar user={props.user}/>
            </div>
        )
    } else {
        return(
        <div>
            <Welcome/>
            <CreateAccount logInAndShowCalendar={logInAndShowCalendar} goBack={goBack} showMe={screen} createANewAccount={props.createANewAccount}/>
            <LogIn goBack={goBack} showMe={screen} logIn={props.logIn}/>
        </div>
    )

    }
}

export default ScreenRender;