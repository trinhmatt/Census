import { firebase, emailAuthProvider } from '../firebase/firebase'
import React from 'react'

export const logIn = (uid) => ({
  type: 'LOGIN',
  uid
})

export const startLogin = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      // .then( () => {
      //   const currentUser = firebase.auth().currentUser.uid
      //   dispatch(logIn(currentUser))
      // })
      .catch( (error) => {
        console.log(error.code, error.message)
      })

  }
}

export const logOut = () => ({
  type: 'LOGOUT'
})

export const startLogOut = () => {
  return (dispatch) => {
    firebase.auth().signOut().then( () => {
      dispatch(logOut())
    })
  }
}
