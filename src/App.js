
//<REACT
import React, { Component } from 'react';
import ScreenRender from './Components/ScreenRender';
//REACT/>

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      reservations: ''
    }
  }

  componentDidMount() {
    console.log('mounted');

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
      this.setState({
        reservations: reservations
      }, () => {
        console.log(this.state.reservations);
      })
    }).catch((error) => {
      console.log(error);
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          user: user
        })
      } else {
        console.log('woooooooooo');
      }
    });


  }

  logIn = (email, password) => {
    console.log('logInAcc');
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  createANewAccount = (email, password) => {
    console.log('createAcc');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    let user = firebase.auth().currentUser;
    if (user) {
      console.log(user.email);
    } else {
      console.log(`ain't no user`)
    }
  }

  render() {
    return(
    <div className="App">
      <ScreenRender user={this.state.user} createANewAccount={this.createANewAccount} logIn={this.logIn}/>
    </div>
    );
  }
}




export default App;
