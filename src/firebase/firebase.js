import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBBZFHQ-Us0gRFJGWeZRDddaPoEQZjYD4I",
    authDomain: "survayyy-7df7c.firebaseapp.com",
    databaseURL: "https://survayyy-7df7c.firebaseio.com",
    projectId: "survayyy-7df7c",
    storageBucket: "survayyy-7df7c.appspot.com",
    messagingSenderId: "163144342720"
  };

firebase.initializeApp(config)

const database = firebase.database();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export {firebase, emailAuthProvider, database as default}
