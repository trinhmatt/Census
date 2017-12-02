import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      history: props.history
    }
  }
  onEmailChange = (e) => {
    const email = e.target.value
    this.setState({email})
  }
  onUsernameChange = (e) => {
    const username = e.target.value
    this.setState({username})
  }
  onPasswordChange = (e) => {
    const password = e.target.value
    this.setState({password})
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({error: 'Please enter an email and password'})
    } else {
      this.setState({error: ''})
      this.props.onSubmit({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    }
  }
  render() {
    return (
      <div>
        <form className='user-form' onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='email'
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          {this.state.history.location.pathname === '/' ? '' : <input
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.onUsernameChange}
          />}
          <input
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button>{this.state.history.location.pathname === '/' ? 'Log In' : 'Register'}</button>
        </form>
      </div>
    )
  }
}

export default withRouter(UserForm)
