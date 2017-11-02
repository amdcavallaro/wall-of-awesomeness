import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class FirebaseProvider extends React.Component {
  static childContextTypes = {
    firebase: PropTypes.object,
  };

  getChildContext() {
    return { firebase: this.firebase };
  }

  componentDidMount() {
    var config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    };

    this.firebase = firebase.initializeApp(config);
  }

  render() {
    return this.props.children;
  }
}
