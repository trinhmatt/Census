import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Register from '../components/Register'
import CreateSurvey from '../components/CreateSurvey'
import SurveyPage from '../components/SurveyPage'
import Login from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AllUserSurveys from '../components/AllUserSurveys'
import CompletedSurvey from '../components/CompletedSurveyPage'
import SurveyResults from '../components/SurveyResults'
import { Redirect } from 'react-router-dom'
import Settings from '../components/SettingsPage'
import UpdateUserForm from '../components/UpdateUserForm'
import DeleteUser from '../components/DeleteUser'


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' component={Login} exact={true} />
        <PublicRoute path='/dashboard' component={Dashboard} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/create' component={CreateSurvey} />
        <PublicRoute path='/survey/:id' component={SurveyPage} exact={true} />
        <PrivateRoute path='/survey/:id/results' component={SurveyResults} />
        <PrivateRoute path='/surveys/:uid' component={AllUserSurveys} />
        <PublicRoute path='/survey/:id/complete' component={CompletedSurvey} />
        <PrivateRoute path='/settings' component={Settings} exact={true}/>
        <PrivateRoute path='/settings/update-display' component={UpdateUserForm} />
        <PrivateRoute path='/settings/update-email' component={UpdateUserForm} />
        <PrivateRoute path='/settings/change-password' component={UpdateUserForm} />
        <PrivateRoute path='/settings/delete' component={DeleteUser} />
        <Redirect from='/redirect' to='/dashboard' />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
