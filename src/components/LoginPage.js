import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import UserForm from './UserForm'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      startLogin: props.startLogin,
      history: props.history
    }
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState( () => ({email}))
  }
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState( () => ({password}))
  }
  render() {
    return (
      <div className='login-page'>
        <div id='landing-header'>
          <h2>CensUS.</h2>
          <p>Get the answers to your questions.</p>
          <Link className='register-link' to='/all'>Home</Link>
          <br></br>
          <Link className='register-link' to='/register'>Register</Link>
          <UserForm onSubmit={(user) => {
            const email = user.email
            const password = user.password
            const rememberMe = user.rememberMe
            this.state.startLogin(email, password, rememberMe)
          }}/>
        </div>
        <ul className="slideshow">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password, rememberMe) => dispatch(startLogin(email, password, rememberMe))
})

export default connect(undefined, mapDispatchToProps)(Login)
