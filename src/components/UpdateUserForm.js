import React from 'react'
import { firebase } from '../firebase/firebase'
import { withRouter } from 'react-router-dom'

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      currentURL: props.match.path,
      updated: '',
      oldPassword: '',
      history: props.history,
      error: '',
      newPassCheck: ''
    }
  }
  componentDidMount() {
    if (this.state.currentURL === '/settings/update-display') {
      this.setState(() => ({placeholder: 'New Username'}))
    } else if (this.state.currentURL === '/settings/update-email') {
      this.setState(() => ({placeholder: 'New Email'}))
    } else {
      this.setState(() => ({placeholder: 'New Password'}))
    }
  }
  onInputChange = (e) => {
    const updated = e.target.value

    this.setState(() => ({updated}))
  }
  onNewPassCheckChange = (e) => {
    const newPassCheck = e.target.value

    this.setState(() => ({newPassCheck}))
  }
  onOldPassChange = (e) => {
    const oldPassword = e.target.value

    this.setState(() => ({oldPassword}))
  }
  submitUpdate = (e) => {
    e.preventDefault();
    if (this.state.placeholder === 'New Email') {
      this.state.user.updateEmail(this.state.updated)
        .then(() => {
          this.state.history.push('/settings')
        })
        .catch( (error) => {
          this.setState(() => ({error: error.message}))
        })
    } else if (this.state.placeholder === 'New Username'){
      this.state.user.updateProfile({displayName: this.state.updated})
        .then( () => {
          this.state.history.push('/settings')
        })
        .catch( (error) => {
          this.setState(() => ({error: error.message}))
        })
    } else {
      //Check if the current password is correct, then check if the new password passes the check
      const email = this.state.user.email
      const password = this.state.oldPassword
      let cred = firebase.auth.EmailAuthProvider.credential(
          email,
          password
      );
      this.state.user.reauthenticateWithCredential(cred)
        .then( () => {
          if (this.state.updated !== this.state.newPassCheck) {
            this.setState(() => ({error: 'Passwords do not match, please try again.'}))
          } else {
            this.state.user.updatePassword(this.state.updated)
              .then( () => {
                this.state.history.push('/settings')
              })
              .catch( (error) => {
                this.setState(() => ({error: error.message}))
              })
          }
        })
        .catch( (error) => {
          console.log(error.message)
          this.setState(() => ({error: 'The current password was incorrect, please try again.'}))
        });
    }
  }
  render() {
    return (
      <div>
        {this.state.error}
        <p>Update user form</p>
        <form onSubmit={this.submitUpdate}>
          {
            this.state.placeholder === 'New Password' ?
            <input
              type='password'
              value={this.state.oldPassword}
              onChange={this.onOldPassChange}
              placeholder='Current password'
            /> : ''
          }
          <input
            type={this.state.placeholder === 'New Password' ? 'password' : 'text'}
            value={this.state.updated}
            onChange={this.onInputChange}
            placeholder={this.state.placeholder}
          />
          {
            this.state.placeholder === 'New Password' ?
            <input
              type='password'
              value={this.state.newPassCheck}
              onChange={this.onNewPassCheckChange}
              placeholder='Repeat new password'
            /> : ''
          }
          <button>Submit Changes</button>
        </form>
      </div>
    )
  }
}

export default withRouter(UpdateUserForm)
