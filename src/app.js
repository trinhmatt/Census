import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)



console.log(store.getState())

firebase.auth().onAuthStateChanged( (user) => {
  if (user) {
    console.log('logged in')
    console.log(user)
  } else {
    console.log('logged out')
  }
})


ReactDOM.render(jsx, document.getElementById('app'))
