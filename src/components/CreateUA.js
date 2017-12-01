import React from 'react'

export default class CreateUA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      type: 'UA',
      error: '',
      disabled: false,
      id: props.id,
      type: props.type
    }
  }
  onQuestionChange = (e) => {
    const question = e.target.value
    this.setState( () => ({question}))
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.question) {
      this.setState( () => ({error: 'Please enter a valid question'}))
    } else if (!this.state.disabled) {
      this.setState( () => ({error: '', disabled: true}) )
      this.props.onSubmit({
        question: this.state.question,
        type: this.state.type,
        id: this.state.id,
        type: this.state.type
      })
    } else {
      this.setState( () => ({disabled: false}))
    }
  }
  render() {
    return (
      <div>
        {this.state.error}
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            value={this.state.question}
            placeholder='question'
            onChange={this.onQuestionChange}
            disabled={this.state.disabled}
          />
          <button disabled={!this.state.question}>{this.state.disabled ? 'Edit' : 'Save'}</button>
        </form>
      </div>
    )
  }
}
