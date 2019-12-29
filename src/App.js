
//<REACT
import React, { Component } from 'react';
import CreateAccount from './Components/CreateAccount';
import LogIn from './Components/LogIn';
import Welcome from './Components/Welcome';
import ScreenRender from './Components/ScreenRender';
//REACT/>
//<REDUX
// import { createSlice } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import actionsObject from './index';
import { useSelector } from 'react-redux';
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


//REDUX LOGIC
//CREATING STATE FOR ACTIVE SCREEN MANAGEMENT


// const screenSlice = createSlice({
//       name: 'screen',
//       initialState: 'welcome',
//       reducers: {
//         app: state => state = 'app',
//         logIn: state => state = 'logIn',
//         signIn: state => state = 'signIn'
//       }
//     })

//     const store = configureStore({
//       reducer: screenSlice.reducer
//     })

//APP COMPONENT

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    console.log('mounted');
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

    // let user = firebase.auth().currentUser;
    // if (user) {
    //   console.log(user.email);
    // } else {
    //   console.log(`ain't no user`)
    // }
  }

  render() {
    return(
    <div className="App">
      <Welcome/>
      <CreateAccount createANewAccount={this.createANewAccount}/>
      <LogIn logIn={this.logIn}/>
    </div>
    );
  }
}




export default App;
