import React from 'react';
import { NavLink } from 'react-router-dom'

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <NavLink to='/create' activeClassName='is-active' exact={true}>Create survey</NavLink>
  </div>
)

export default Dashboard;
