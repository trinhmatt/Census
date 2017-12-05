import React from 'react'
import { firebase } from '../firebase/firebase'
import { withRouter } from 'react-router-dom'

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      history: props.history,
      user: firebase.auth().currentUser,
      error: ''
    }
  }
  onPassChange = (e) => {
    const password = e.target.value

    this.setState(() => ({password}))
  }
  deleteAccount = (e) => {
    e.preventDefault();
    const email = this.state.user.email
    const password = this.state.password
    let cred = firebase.auth.EmailAuthProvider.credential(
        email,
        password
    );
    this.state.user.reauthenticateWithCredential(cred)
      .then( () => {
        this.state.user.delete()
          .then( () => {
            this.state.history.push('/')
          })
          .catch( (error) => {
            this.setState( () => ({error: error.message}))
          })
      })
      .catch( () => {
        this.setState( () => ({error: 'Incorrect password, try again.'}))
      })
  }
  render() {
    return (
      <div>
        <h3>Confirm Delete</h3>
        {this.state.error}
        <form onSubmit={this.deleteAccount}>
          <input
            type='password'
            value={this.state.password}
            onChange={this.onPassChange}
            placeholder='Password'
          />
          <button>Delete Account</button>
        </form>
      </div>
    )
  }
}

export default withRouter(DeleteUser)
