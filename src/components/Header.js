import React from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react'
import { startLogOut } from '../actions/auth'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      auth: props.auth,
      startLogOut: props.startLogOut,
      history: props.history
    }
  }
  onHeaderClick = (e, {name}) => {
    //Set active item in header to selected header button
    //Switch must be in call back since setState is async
    this.setState(() => ({activeItem: name}), () => {

      //Based on button, push user to related route
      switch (this.state.activeItem) {
        case 'Home':
          this.state.history.push('/dashboard')
          break;
        case 'Create Survey':
          this.state.history.push('/create')
          break;
        case 'All Surveys':
          this.state.history.push('/all')
          break;
      }
    })
  }
  toSurveys = () => {
    this.state.history.push(`/surveys/${this.state.auth.uid}`)
  }
  toSettings = () => {
    this.state.history.push('/settings')
  }
  render() {
    const {activeItem} = this.state
    return (
      // <div className='header'>
        <Menu className='nav-header' color={'teal'} inverted size='massive' stackable compact>
          <Menu.Item name='Home' active={activeItem === 'home'} onClick={this.onHeaderClick}/>
          <Menu.Item name='Create Survey' active={activeItem === 'create'} onClick={this.onHeaderClick}/>
          <Menu.Item name='All Surveys' active={activeItem === 'allSurveys'} onClick={this.onHeaderClick}/>
          <p id='header-brand'>CensUS.</p>
          <Menu.Menu position='right'>
            {!this.state.auth.uid ? <Button primary>Sign Up</Button>
              : <Dropdown item text={this.state.auth.displayName || 'Anonymous'}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.toSurveys}>
                      <Link to={`/surveys/${this.state.auth.uid}`}>My Surveys</Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.toSettings}>
                      <Link to='/settings'>Settings</Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.state.startLogOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            }
          </Menu.Menu>
        </Menu>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogOut: () => dispatch(startLogOut())
})

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
