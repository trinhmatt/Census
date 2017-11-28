import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      startLogin: props.startLogin
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
  onLoginSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email
    const password = this.state.password
    this.state.startLogin(email, password)
  }
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Link to='/register'>Register</Link>
        <form onSubmit={this.onLoginSubmit}>
          <input
            type='text'
            value={this.state.email}
            onChange={this.onEmailChange}
            placeholder='email'
          />
          <input
            type='password'
            value={this.state.password}
            onChange={this.onPasswordChange}
            placeholder='password'
          />
          <button>Log in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
})

export default connect(undefined, mapDispatchToProps)(Login)
