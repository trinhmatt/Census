import React from 'react'
import { setTextFilter } from '../actions/filters'
import { connect } from 'react-redux'

class TextFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textToFilter: '',
      dispatch: props.dispatch
    }
  }
  onTextChange = (e) => {
    const text = e.target.value
    this.state.dispatch(setTextFilter(text))
  }
  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Search...'
          value={this.state.text}
          onChange={this.onTextChange}
          id='text-filter'
        />
      </div>
    )
  }
}

export default connect()(TextFilter);
