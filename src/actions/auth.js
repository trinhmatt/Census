import { firebase, emailAuthProvider } from '../firebase/firebase'
import React from 'react'

export const startLogin = () => {
  return () => {
    firebase.auth().signInWithPopup(emailAuthProvider)
  }
}

export const startLogOut = () => {
  return () => {
    firebase.auth().signOut()
  }
}
