
//<REACT
import React from 'react';
import ScreenRender from './Components/ScreenRender';
//REACT/>

//<REDUX
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from './index';
//REDUX/>

//<DATE-FNS
import { format } from 'date-fns';
//DATE-FNS/>

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


    const dispatch = useDispatch();
    let user = useSelector(state => state.user);
    const setAllReservations = actionsFunction().reservationsActions.stateTheState;
    const setUsersReservations = actionsFunction().reservationsActions.stateYourReservations;
    const setAUser = actionsFunction().userActions.setAUser;
    const calendarAction = actionsFunction().screenActions.calendar;
    const welcomeAction = actionsFunction().screenActions.welcome;
    const switchBookingScreen = actionsFunction().restaurantActions.switchBookingScreen;


    //FUNCTION TO SHOW THE CALENDAR SCREEN
    const showCalendar = () => {
      dispatch(calendarAction());
      let checkIfLoggedIn = setTimeout(() => {
        let firebaseUser = firebase.auth().currentUser
        if (!firebaseUser) {
            dispatch(welcomeAction());
        } else {
            console.log('user succesfully logged and will stay that way');
        }
      }, 5000);
  }




    //TRY TO GET THE DATA WITH A SNAPSHOT METHOD INSTEAD OF 'GET()'
    db.collection('reservations').onSnapshot(function(querySnapshot) {
    let reservations = [];
    let currentUsersReservations = [];
      querySnapshot.forEach((doc) => {
          let date = doc.id.slice(0, 19);
          let reservation = {
              date: date,
              info: doc.data(),
              firestoreID: doc.id
      }
      if (reservation.info.user === user.email) {
        currentUsersReservations.push(reservation);
      }
      reservations.push(reservation);
    })
    dispatch(setUsersReservations(currentUsersReservations));
    dispatch(setAllReservations(reservations));
    });

    //ADDING A NEW RESERVATION IN FIRESTORE
    
    const addReservation = function(date, hourSpan, tables, name, phoneNumber) {

      let documentName = format(date, "y-MM-dd") + "T" + hourSpan[0] + ":00";
      let randomNum = Math.random()*1000;
      documentName = documentName.concat(randomNum);

      let tablesArray = [];

      tables.forEach((table, i) => {
          if (table) {
              tablesArray.push(i + 1);
          }
      });
      
      db.collection("reservations").doc(documentName).set({
        duration: hourSpan[1],
        name: name,
        phone_number: phoneNumber,
        spots: tablesArray,
        user: user.email
      })
      .then(function() {
        alert("reservation succesfully added");
        dispatch(switchBookingScreen());
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }

    //DELETING A RESERVATION
    
    const deleteAReservation = function(date) {

      db.collection("reservations").doc(date).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    
    }

    //SETTIN A LISTENER ON THE AUTH OBJECT TO MONITOR IF A USER IS LOGGED IN
    firebase.auth().onAuthStateChanged((userrr) => {
        if (userrr) {
          // user.email = userrr.email;
          dispatch(setAUser(userrr.email));
        } else {
          console.log('woooooooooo');
          // dispatch(unsetAUser());
        }
    });

    // HANDLING LOGGING IN
    const logIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          console.log(errorCode);
          //auth/user-not-found
          if (errorCode === 'auth/user-not-found') {
            alert('user does not exist');
          }
        });
        showCalendar();
    }
    
    //HANDLING CREATING A NEW ACCOUNT
    const createANewAccount = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        showCalendar();
    }

    //HANDLING LOGGING OUT
    const logOut = () => {
      firebase.auth().signOut().then(function() {
        dispatch(welcomeAction())
        dispatch(setAUser("no_user"));
        console.log('i log outtttttt')
      }).catch(function(error) {
        console.log(error);
      });
    }

    let intViewportWidth = window.innerWidth;

    if (intViewportWidth > 500) {
      return(
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <p>
            Please, view this app via a mobile device simulation. :)
          </p>
        </div>
      )
    } else {
      return(
    <div className="App">
        <ScreenRender deleteAReservation={deleteAReservation} addReservation={addReservation} logOut={logOut} showCalendar={showCalendar} createANewAccount={createANewAccount} logIn={logIn}/>
    </div>
    );
    }
}

export default AppFunc;