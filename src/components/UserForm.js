import React from 'react'

export default class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
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
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='email'
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <input
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
          <input
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
