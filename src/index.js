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
    initialState: 'calendar',
    reducers: {
      welcome: state => state = 'welcome',
      logIn: state => state = 'logIn',
      signIn: state => state = 'signIn',
      calendar: state => state = 'calendar'
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setAUser: (state, action) => {
          state = action.payload;
        },
        unsetAUser: (state) => {
            state = {};
        }
      }
})

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: [],
    reducers: {
        addAReservation: (state, action) => {
          state.push(action.payload);
        }
      }
})


//REDUX - MAKING AN ALLREDUCER

const screenReducer = screenSlice.reducer;
const reservationsReducer = reservationsSlice.reducer;
const userReducer = userSlice.reducer;

const allReducer = combineReducers({
    screen: screenReducer,
    reservations: reservationsReducer,
    user: userReducer
})


//REDUX - STORE PLUS ALL THE ACTIONS TO EXPORT

const store = configureStore({
    reducer: allReducer
})

const actionsObject = {
    screenActions: screenSlice.actions,
    reservationsActions: reservationsSlice.actions,
    userActions: userSlice.actions
}


//STARTING THE REACT RENDER
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//EXPORTING ALL THE ACTIONS FOR FURTHER USE

export function actionsFunction() {
    return actionsObject
};