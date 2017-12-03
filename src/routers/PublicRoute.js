import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'

const PublicRoute = ({component: Component, ...rest}) => (
  <Route {...rest} component={ (props) => (
      <div>
        <Header />
        <Component {...props}/>
        <Footer />
      </div>
    )
  }/>
)

export default PublicRoute;
