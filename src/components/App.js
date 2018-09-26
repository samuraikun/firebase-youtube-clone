import React, { Component } from 'react';
import firebase from 'firebase/app';
import config from '../config/firebase-config';
import Header from './Header';

class App extends Component {
  constructor() {
    super();

    // Initialize Firebase
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Header />
    );
  }
}

export default App;