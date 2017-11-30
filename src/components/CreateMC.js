import React from 'react'

export default class CreateMC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      nAnswers: 0,
      error: '',
      disabled: false,
      type: props.type
    }
  }
  onQuestionChange = (e) => {
    e.preventDefault();
    const question = e.target.value;
    this.setState( () => ({question}) )
  }
  onAnswerChange = (e) => {
    e.preventDefault();
    const answerID = e.target.id
    const answerVal = e.target.value
    this.setState( (prevState) => {
      let allAnswers = prevState.answers
      allAnswers[answerID] = answerVal
      return {answers: allAnswers}
    })
  }
  generateAnswerInput = () => {
    let answers = []
    let stateAnswers = []
    for (let i=0; i<this.state.nAnswers; i++) {
      const answerInput = (
        <input
          type='text'
          placeholder='answer'
          key={i}
          id={i}
          value={this.state.answers[i]}
          onChange={this.onAnswerChange}
          disabled={this.state.disabled}
        />
      )
      answers.push(answerInput)
      stateAnswers.push('')
    }
    return answers
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('fired')
    if (this.state.answers.length === 0) {
      this.setState(() => ({error: 'Please add at least one answer'}))
    } else {
      this.setState( () => ({error: '', disabled: true}) )
      this.props.onSubmit({
        question: this.state.question,
        answers: this.state.answers,
        type: this.state.type
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.error}
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='question'
            value={this.state.question}
            onChange={this.onQuestionChange}
            disabled={this.state.disabled}
          />
          <button
            disabled={this.state.disabled}
          >Save Question</button>
        </form>
        <button
          onClick={ () => {
            this.setState( (prevState) => {
              const answerSetUp = ['']
              return {
                nAnswers: prevState.nAnswers + 1,
                answers: prevState.answers.concat(answerSetUp)
              }
            })
          }}
          disabled={this.state.disabled}
          >
            Add answer
          </button>
        {this.state.nAnswers ? this.generateAnswerInput() : ''}
      </div>
    )
  }
}
