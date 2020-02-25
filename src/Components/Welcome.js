import React from 'react';
import { actionsFunction } from '../index';
import { useDispatch } from 'react-redux';

export default function Welcome() {
    
    const dispatch = useDispatch();
    const logInAction = actionsFunction().screenActions.logIn;
    const signInAction = actionsFunction().screenActions.signIn;
    

    return(
        <section className='fullScreen primaryView' id='trytry'>
            <h1 className='welcome_header'>Welcome to our restaurant calendar!</h1>
            <button className='add_res_button' onClick={ () => {dispatch(logInAction())}}>log in</button>
            <button className='add_res_button' onClick={ () => {dispatch(signInAction())}}>sign in</button>
            <div className='positioning_div'></div>
        </section>
    )
}