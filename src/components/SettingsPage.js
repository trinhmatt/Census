import React from 'react'
import { firebase } from '../firebase/firebase'
import { withRouter } from 'react-router-dom'


class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      history: props.history,
      deleteModal: null
    }
  }
  closeModal = () => {
    this.setState(() => ({deleteModal: true}))
  }
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <h3>My Account</h3>
          <p>
            Username: {this.state.user.displayName}
            <button onClick={() => {
              this.state.history.push('/settings/update-display')
            }}>Change</button>
          </p>
          <p>
            Email: {this.state.user.email}
            <button onClick={() => {
              this.state.history.push('/settings/update-email')
            }}>Change</button>
          </p>
          <button onClick={() => {
            this.state.history.push('/settings/change-password')
          }}>Change password</button>
          <button onClick={() => {
            this.state.history.push('/settings/delete')
          }}>Delete account</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Settings)
