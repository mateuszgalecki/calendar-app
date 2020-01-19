import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import App from './App';
import AppFunc from './AppFunc';
import * as serviceWorker from './serviceWorker';

//REDUX - GENERATING ALL THE SLICES (REDUCERS)
import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';


const screenSlice = createSlice({
    name: 'screen',
    initialState: 'calendar_month',
    reducers: {
      welcome: state => state = 'welcome',
      logIn: state => state = 'logIn',
      signIn: state => state = 'signIn',
      calendar: state => state = 'calendar',
      month: state => state = 'calendar_month'
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: { email: '' },
    reducers: {
        setAUser: (state, action) => {
          state.email = action.payload;
        },
        unsetAUser: (state) => {
            state.email = '';
        }
      }
})

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: { 
      reservations: []
    },
    reducers: {
        stateTheState: (state, action) => {
          state.reservations = action.payload;
        }
      }
})

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: '',
    activeMonth: 0
  },
  reducers: {
    setActiveMonth: (state, action) => {
      state.activeMonth = action.payload
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload
    }
  }
})

const viewDaySlice = createSlice({
  name: 'viewDay',
  initialState: {
    value: 'Sun Jan 12 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)'
  },
  reducers: {
    setViewDay: (state, action) => {
      state.value = action.payload
    }
  }
})

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    tablesArray: [[], [], [], [], [], [], [], [], [], []],
    hourSpan: ['08:00', '22:00']
  },
  reducers: {
    setTablesArray: (state, action) => {
      state.tablesArray = action.payload
    },
    setLowerValue: (state, action) => {
      state.hourSpan[0] = action.payload
    },
    setUpperValue: (state, action) => {
      state.hourSpan[1] = action.payload
    }
  }
})


//REDUX - MAKING AN ALLREDUCER

const screenReducer = screenSlice.reducer;
const reservationsReducer = reservationsSlice.reducer;
const userReducer = userSlice.reducer;
const dateReducer = dateSlice.reducer;
const viewDayReducer = viewDaySlice.reducer;
const restaurantReducer = restaurantSlice.reducer;

const allReducer = combineReducers({
    screen: screenReducer,
    reservations: reservationsReducer,
    user: userReducer,
    date: dateReducer,
    viewDay: viewDayReducer,
    restaurant: restaurantReducer
})


//REDUX - STORE PLUS ALL THE ACTIONS TO EXPORT

const store = configureStore({
    reducer: allReducer
})

const actionsObject = {
    screenActions: screenSlice.actions,
    reservationsActions: reservationsSlice.actions,
    userActions: userSlice.actions,
    dateActions: dateSlice.actions,
    viewDayActions: viewDaySlice.actions,
    restaurantActions: restaurantSlice.actions
}


//STARTING THE REACT RENDER
ReactDOM.render(<Provider store={store}>
    <AppFunc />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//EXPORTING ALL THE ACTIONS FOR FURTHER USE

export function actionsFunction() {
    return actionsObject
};