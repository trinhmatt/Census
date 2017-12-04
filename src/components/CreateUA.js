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
      type: props.type,
      deleteQuestion: props.deleteQuestion
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
  deleteQuestion = () => {
    this.state.deleteQuestion(this.state.id)
  }
  render() {
    return (
      <div id='UA-question'>
        <i id='delete-button' className="fa fa-window-close-o" aria-hidden="true" onClick={this.deleteQuestion}></i>
        {this.state.error}
        <form onSubmit={this.onSubmit}>
          <button disabled={!this.state.question}>{this.state.disabled ? 'Edit' : 'Save'}</button>
          <input
            type='text'
            value={this.state.question}
            placeholder='question'
            onChange={this.onQuestionChange}
            disabled={this.state.disabled}
          />
        </form>
      </div>
    )
  }
}
