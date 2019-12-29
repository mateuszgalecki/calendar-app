import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

//REDUX - GENERATING ALL THE SLICES (REDUCERS)
import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';


const screenSlice = createSlice({
    name: 'screen',
    initialState: 'welcome',
    reducers: {
      app: state => state = 'app',
      logIn: state => state = 'logIn',
      signIn: state => state = 'signIn'
    }
})


//REDUX - MAKING AN ALLREDUCER

const screenReducer = screenSlice.reducer;

const allReducer = combineReducers({
    screen: screenReducer
})


//REDUX - STORE PLUS ALL THE ACTIONS TO EXPORT

const store = configureStore({
    reducer: allReducer
})

const actionsObject = {
    screenActions: screenSlice.actions
}

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export function actionsFunction() {
    return actionsObject
};