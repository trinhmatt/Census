import React from 'react'
import {firebase} from '../firebase/firebase'
import UserForm from './UserForm'

const Register = (props) => (
  <div className='login-page'>
    <div id='landing-header'>
      <h2>Register</h2>
      <UserForm onSubmit={ (formUser) => {
        firebase.auth().createUserWithEmailAndPassword(formUser.email, formUser.password)
        .then( (user) => {
          user.updateProfile({displayName: formUser.username})
            .then( () => {
              props.history.push('/redirect')
            })
            .catch( (error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage)
            })
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
      }}/>
    </div>
    <ul className="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
)

export default Register;
