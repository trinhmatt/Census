import React from 'react';
import { startLogOut } from '../actions/auth'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = ({startLogOut, auth}) => (
  <div>
    <h1>Header</h1>
    <button onClick={startLogOut}>Log out</button>
    <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Home</NavLink>
    {auth.uid ? <NavLink to='/create' activeClassName='is-active' exact={true}>Create survey</NavLink> : ''}
    {auth.uid ? <NavLink to={`/surveys/${auth.uid}`} activeClassName='is-active' exact={true}>My Surveys</NavLink> : ''}
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogOut: () => dispatch(startLogOut())
})

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
