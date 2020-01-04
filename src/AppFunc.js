
//<REACT
import React from 'react';
import ScreenRender from './Components/ScreenRender';
//REACT/>

//<REDUX
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from './index';
//REDUX/>

//<FIREBASE
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: 'AIzaSyAFE5YT_p3JiDo6rHenm792Ho8dpCzoyOU',
  authDomain: 'restaurant-calendar-2fd31.firebaseapp.com',
  projectId: 'restaurant-calendar-2fd31'
});

const db = firebase.firestore();
//FIREBASE/>



//APP COMPONENT


const AppFunc = function() {

    console.log('mounted');

    const dispatch = useDispatch();
    let user = useSelector(state => state.user).email;
    const setAllReservations = actionsFunction().reservationsActions.stateTheState;
    const setAUser = actionsFunction().userActions.setAUser;
    const unsetAUser = actionsFunction().userActions.unsetAUser;
    const calendarAction = actionsFunction().screenActions.calendar;
    const welcomeAction = actionsFunction().screenActions.welcome;


    //FUNCTION TO SHOW THE CALENDAR SCREEN
    const showCalendar = () => {
      dispatch(calendarAction());
      console.log('hello, calendar');
      let checkIfLoggedIn = setTimeout(() => {
        if (user.email === '') {
          dispatch(welcomeAction());
          console.log('no such user')
        } else {
          console.log('user succesfully logged and will stay that way');
        }
      }, 5000);
  }


    //GETTING ALL THE RESERVATIONS FROM FIREBASE
    db.collection('reservations').get().then((querySnapshot) => {
        let reservations = [];
        querySnapshot.forEach((doc) => {
            let reservation = {
                date: doc.id,
                info: doc.data()
        }
        reservations.push(reservation);
      })
      dispatch(setAllReservations(reservations));
    }).catch((error) => {
      console.log(error);
    })

    //SETTIN A LISTENER ON THE AUTH OBJECT TO MONITOR IF A USER IS LOGGED IN
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.email);
          dispatch(setAUser(user.email));
        } else {
          console.log('woooooooooo');
          dispatch(unsetAUser());
        }
    });

    // HANDLING LOGGING IN
    const logIn = (email, password) => {
        console.log('logInAcc');
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          console.log(errorCode);
          //auth/user-not-found
          if (errorCode === 'auth/user-not-found') {
            console.log('user does not exist');
          }
        });
        showCalendar();
    }
    
    //HANDLING CREATING A NEW ACCOUNT
    const createANewAccount = (email, password) => {
        console.log('createAcc');
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        showCalendar();
    }

    
    return(
    <div className="App">
        <ScreenRender showCalendar={showCalendar} createANewAccount={createANewAccount} logIn={logIn}/>
    </div>
    );
}

export default AppFunc;