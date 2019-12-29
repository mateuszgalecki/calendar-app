import React from 'react';
import { actionsFunction } from '../index';
import { useSelector, useDispatch } from 'react-redux';

export default function Welcome() {
    
    const dispatch = useDispatch();
    const logInAction = actionsFunction().screenActions.logIn;
    const screen = useSelector(state => state.screen);

    

    return(
        <section className='fullScreen primaryView'>
            <button onClick={ () => {dispatch(logInAction())}}>log in</button>
            <button>sign in</button>
        </section>
    )
}