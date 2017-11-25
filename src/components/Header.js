import React from 'react';
import { startLogOut } from '../actions/auth'
import { connect } from 'react-redux'

const Header = ({startLogOut}) => (
  <div>
    <h1>Header</h1>
    <button onClick={startLogOut}>Log out</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogOut: () => dispatch(startLogOut())
})

export default connect(undefined, mapDispatchToProps)(Header);
