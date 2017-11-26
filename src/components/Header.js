import React from 'react';
import { startLogOut } from '../actions/auth'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = ({startLogOut}) => (
  <div>
    <h1>Header</h1>
    <button onClick={startLogOut}>Log out</button>
    <NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
    <NavLink to='/create' activeClassName='is-active' exact={true}>Create survey</NavLink>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogOut: () => dispatch(startLogOut())
})

export default connect(undefined, mapDispatchToProps)(Header);
