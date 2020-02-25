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
    initialState: 'welcome',
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
    initialState: { email: "no_user" },
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
      reservations: [],
      yourReservations: []
    },
    reducers: {
        stateTheState: (state, action) => {
          state.reservations = action.payload;
        },
        stateYourReservations: (state, action) => {
          state.yourReservations = action.payload;
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
    value: 'hide',
    addReservation: false
  },
  reducers: {
    setViewDay: (state, action) => {
      state.value = action.payload
    },
    setAddReservation: (state) => {
      state.addReservation = !state.addReservation
    }
  }
})

//Sun Jan 12 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    tablesArray: [false, false, false, false, false, false, false, false, false, false],
    hourSpan: ['08:00', '22:00'],
    bookingScreen: false,
    resName: '',
    resPhone: '',
  },
  reducers: {
    setTable: (state, action) => {
      state.tablesArray[action.payload] = !state.tablesArray[action.payload];
    },
    switchBookingScreen: (state) => {
      state.bookingScreen = !state.bookingScreen;
    },
    setTableAsFalse: (state, action) => {
      state.tablesArray[action.payload] = false;
    },
    setLowerValue: (state, action) => {
      state.hourSpan[0] = action.payload;
    },
    setUpperValue: (state, action) => {
      state.hourSpan[1] = action.payload;
    },
    setResName: (state, action) => {
      state.resName = action.payload;
    },
    setResPhone: (state, action) => {
      state.resPhone = action.payload;
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