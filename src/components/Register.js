import React from 'react'
import {firebase} from '../firebase/firebase'
import UserForm from './UserForm'

const Register = (props) => (
  <div>
    <h1>Register</h1>
    <UserForm onSubmit={ (user) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then( () => {
        props.history.push('/')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    }}/>
  </div>
)

export default Register;
