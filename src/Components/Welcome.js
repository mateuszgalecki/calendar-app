import React from 'react';
import { actionsFunction } from '../index';
import { useDispatch } from 'react-redux';

export default function Welcome() {
    
    const dispatch = useDispatch();
    const logInAction = actionsFunction().screenActions.logIn;
    const signInAction = actionsFunction().screenActions.signIn;
    

    return(
        <section className='fullScreen primaryView'>
            <button onClick={ () => {dispatch(logInAction())}}>log in</button>
            <button onClick={ () => {dispatch(signInAction())}}>sign in</button>
        </section>
    )
}