import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import { startSetSurveys } from './actions/surveys'
import { logIn, logOut } from './actions/auth'

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

//For user auth, to ensure correct route behaviour
let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    store.dispatch(startSetSurveys()).then( () => {
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
    });
  }
};


console.log(store.getState())


firebase.auth().onAuthStateChanged( (user) => {
  if (user) {
    store.dispatch(startSetSurveys()).then( () => {
      //Don't know why I can't dispatch logIn in the actions
      //Users cannot go anywhere without this line
      store.dispatch(logIn(user.uid))
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    });
  } else if (history.location.pathname.indexOf('/survey/') > -1) {
    renderApp();
  } else {
    renderApp();
    history.push('/')
  }
})
