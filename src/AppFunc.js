
//<REACT
import React from 'react';
import ScreenRender from './Components/ScreenRender';
//REACT/>

//<REDUX
import { useSelector, useDispatch } from 'react-redux';
import { actionsFunction } from '../index';
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


const App = function() {

    console.log('mounted');

    const dispatch = useDispatch();
    const addAReservation = actionsFunction().reservationsActions.addAReservation;
    const setAUser = actionsFunction().userActions.setAUser;
    const unsetAUser = actionsFunction().userActions.unsetAUser;


    //GETTING ALL THE RESERVATIONS FROM FIREBASE
    db.collection('reservations').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let reservation = {
          date: doc.id,
          info: doc.data()
        }
        dispatch(addAReservation(reservation));
      })
    }).catch((error) => {
      console.log(error);
    })

    //SETTIN A LISTENER ON THE AUTH OBJECT TO MONITOR IF A USER IS LOGGED IN
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          dispatch(setAUser(user));
        } else {
          console.log('woooooooooo');
          dispatch(unsetAUser());
        }
    });

    // HANDLING LOGGING IN
    logIn = (email, password) => {
        console.log('logInAcc');
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    
    //HANDLING CREATING A NEW ACCOUNT
    createANewAccount = (email, password) => {
        console.log('createAcc');
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    
    return(
    <div className="App">
        <ScreenRender user={this.state.user} createANewAccount={this.createANewAccount} logIn={this.logIn}/>
    </div>
    );
}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: '',
//       reservations: ''
//     }
//   }

//   componentDidMount() {
//     console.log('mounted');

//     //GETTING ALL THE RESERVATIONS FROM FIREBASE
//     db.collection('reservations').get().then((querySnapshot) => {
//       let reservations = [];
//       querySnapshot.forEach((doc) => {
//         let reservation = {
//           date: doc.id,
//           info: doc.data()
//         }
//         reservations.push(reservation);
//       })
//       this.setState({
//         reservations: reservations
//       }, () => {
//         console.log(this.state.reservations);
//       })
//     }).catch((error) => {
//       console.log(error);
//     })

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log(user);
//         this.setState({
//           user: user
//         })
//       } else {
//         console.log('woooooooooo');
//       }
//     });


//   }

//   logIn = (email, password) => {
//     console.log('logInAcc');
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//       let errorCode = error.code;
//       let errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   }

//   createANewAccount = (email, password) => {
//     console.log('createAcc');
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//       let errorCode = error.code;
//       let errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   }

//   render() {
//     return(
//     <div className="App">
//       <ScreenRender user={this.state.user} createANewAccount={this.createANewAccount} logIn={this.logIn}/>
//     </div>
//     );
//   }
// }